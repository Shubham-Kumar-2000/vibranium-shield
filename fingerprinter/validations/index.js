const { Joi, validate } = require('express-validation');

const schema = Joi.object({
    ip: Joi.string().ip().required(),
    userAgent: Joi.string().required()
});

exports.validation = validate({ body: schema }, {}, {});
