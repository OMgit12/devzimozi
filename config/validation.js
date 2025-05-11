// validation/userValidation.js
const Joi = require('joi');

const UserValidation = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().required(),
    address: Joi.array().items(Joi.string()).required(),
    userType: Joi.string().valid('admin', 'client', 'user').default('client'),
    answer: Joi.string().required()
});

module.exports = { UserValidation };
