const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
    'Access-Control-Max-Age': '86400'
};
addEventListener('fetch', async (event) => {
    event.respondWith(
        handleRequest(event.request).catch(
            (err) =>
                new Response(err.stack, { status: 500, headers: corsHeaders })
        )
    );
});
function handleOptions(request) {
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    const headers = request.headers;
    if (
        headers.get('Origin') !== null &&
        headers.get('Access-Control-Request-Method') !== null &&
        headers.get('Access-Control-Request-Headers') !== null
    ) {
        const respHeaders = {
            ...corsHeaders,
            'Access-Control-Allow-Headers': request.headers.get(
                'Access-Control-Request-Headers'
            )
        };

        return new Response(null, {
            headers: respHeaders
        });
    } else {
        return new Response(null, {
            headers: {
                Allow: 'GET, HEAD, POST, OPTIONS'
            }
        });
    }
}
const handleRequest = async (request) => {
    if (request.method === 'OPTIONS') {
        return handleOptions(request);
    }
    if (request.method == 'POST') {
        const data = await request.json();
        await CONFIG.put(`data`, JSON.stringify(data));
        return new Response('OK', { status: 200, headers: corsHeaders });
    }
    if (request.method == 'GET') {
        const data = await CONFIG.get(`data`);
        return new Response(data, {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
    return new Response('Not Found', { status: 404 });
};
