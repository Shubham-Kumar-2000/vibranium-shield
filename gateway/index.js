// eslint-disable-next-line no-unused-vars
let config = null;

const populateConfig = async () => {
    config = JSON.parse(await CONFIG.get('data'));
    config.servers = {
        Org: 'Original',
        Dummy: 'Dummy'
    };
};

// TODO : is bot

addEventListener('fetch', (event) => {
    event.respondWith(
        handleRequest(event.request).catch(
            (err) =>
                new Response(JSON.stringify(err), {
                    status: 500,
                    statusText: err.message
                })
        )
    );
});

const verifyRecptcha = async (data, request) => {
    const token = request.headers.get('x-recaptcha');
    if (!token) throw new Error('Recaptcha not provided');
    const recaptchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `secret=${config.ReCaptcha.Sceret}&response=${token}`
        }
    ).then((res) => res.json());
    if (!recaptchaResponse.success) {
        throw new Error('Recaptcha Invalid');
    }
    data.reCaptchaVerified = true;
    data.reCaptchaScore = recaptchaResponse.score;
    return;
};
const getFingerPrint = async (data) => {
    const { ip, userAgent } = data;
    if (!ip || !userAgent) return;
    const fingerprint = await fetch(
        `https://juspay-shubham-kumar-2000.vercel.app/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ip, userAgent })
        }
    ).then((res) => res.json());
    if (fingerprint.err) return;
    data.fpBlocked = Number(
        (await DATABASE.get(`fingerprint-${fingerprint.fingerprint.hash}`)) || 0
    );
    data.fingerprint = fingerprint.fingerprint.components;
    data.fingerprintHash = fingerprint.fingerprint.hash;
    return;
};
const getIpRate = async (data) => {
    const { ip } = data;
    if (!ip) return;
    data.ipBlocked = Number((await DATABASE.get(`ip-${ip}`)) || 0);
    data.ipChecked = true;
    return;
};
const getAuth = async (data, request) => {
    data.Auth = request.headers.get(config.AuthHeader);
    return;
};
const shouldCheckRule = (data, rule) => {
    const { pattern } = rule;
    if (data.server) return false;
    if (!pattern || !pattern.value || !pattern.key) return true;
    const exp = new RegExp(pattern.value);
    if (exp.test(data[pattern.key])) {
        return true;
    }
    return false;
};
const setInvalidResponse = async (data) => {
    if (!shouldCheckRule(data, config.InvalidOptions)) return;
    data.invalidKeyStatus = config.InvalidOptions.keyStatus;
    data.checkInvalid = true;
    data.incInvalid = Math.round(
        config.MaxRequestLimit / config.InvalidOptions.value
    );
};
// response.status
const checkInvalidResponse = async (data, response) => {
    if (!data.checkInvalid) return;
    if (data.server !== config.servers.Org) return;
    await response;
    if (data.invalidKeyStatus.includes(response.status)) {
        data.blocked += data.incInvalid;
    }
};
const updateRate = async (data) => {
    if (data.ipChecked)
        await DATABASE.put(`ip-${data.ip}`, data.blocked, {
            expirationTtl: config.ttl
        });
    if (data.fingerprintHash)
        await DATABASE.put(
            `fingerprint-${data.fingerprintHash}`,
            data.blocked,
            {
                expirationTtl: config.ttl
            }
        );
};
const plugins = {
    ReCaptcha: verifyRecptcha,
    IP: getIpRate,
    FingerPrinter: getFingerPrint,
    Authorization: getAuth,
    'Invalid-Response': setInvalidResponse
};
const rulesHandler = {
    Rate: (data, rule) => {
        if (!shouldCheckRule(data, rule)) return;
        if (data.blocked > config.MaxRequestLimit) {
            data.server = config.servers.Dummy;
        }
        data.blocked += rule.value;
        return;
    },
    'ReCaptcha-limit': (data, rule) => {
        if (!shouldCheckRule(data, rule)) return;
        if (data.reCaptchaVerified && data.reCaptchaScore < rule.value) {
            data.server = config.servers.Dummy;
        }
    },
    'ReCaptcha-range': (data, rule) => {
        if (!shouldCheckRule(data, rule)) return;
        if (
            data.reCaptchaVerified &&
            data.reCaptchaScore >= rule.min &&
            data.reCaptchaScore <= rule.max
        ) {
            data.blocked +=
                Math.pow(rule.value, (rule.max - data.reCaptchaScore) * 10) - 1;
        }
    },
    'Auth-accept': (data, rule) => {
        if (!shouldCheckRule(data, rule)) return;
        if (data.Auth) {
            data.server = config.servers.Org;
        }
    },
    Pattern: (data, rule) => {
        if (!shouldCheckRule(data, rule)) return;
        data.server = rule.server;
    },
    'Reject-Bot': (data, rule) => {
        if (!shouldCheckRule(data, rule)) return;
        if (data.fingerprint && data.fingerprint.isBot) {
            data.server = config.servers.Dummy;
        }
    }
};

/**
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request) {
    if (!config) await populateConfig();
    if (config.AcceptedMethods.includes(request.method)) {
        return fetch(request);
    }
    const url = new URL(request.url);
    const domain = new URL(url).hostname;
    const dummyUrl = url.toString().replace(domain, config.DummyOrigin);
    const data = {
        url,
        path: url.pathname,
        domain,
        dummyUrl,
        ip:
            request.headers.get('x-real-ip') ||
            request.headers.get('cf-connecting-ip'),
        userAgent: request.headers.get('User-Agent') || '',
        fpBlocked: 0,
        ipBlocked: 0
    };
    await Promise.all(
        config.plugins.map((plugin) => plugins[plugin](data, request))
    );
    data.blocked = Math.max(data.fpBlocked, data.ipBlocked);
    config.rules.forEach((rule) => rulesHandler[rule.type](data, rule));
    if (!data.server) {
        data.server = config.servers.Org;
    }
    if (data.server === config.servers.Dummy) {
        request = new Request(dummyUrl, request);
    }

    const response = fetch(request);
    await checkInvalidResponse(data, response);
    await updateRate(data);

    return response;
}
