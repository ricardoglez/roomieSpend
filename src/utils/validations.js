import Joi from '@hapi/joi';

const today= new Date();
const tomorrow = new Date();
const validations = {
    stringRequired: Joi.string()
        .empty("")
        .min(3)
        .required(),
    arrayRequired: Joi.array()
        .min(1)
        .required(),
    objectRequired: Joi.object()
        .min(1)
        .required(),
    numberRequired: Joi.number()
        .min(1)
        .empty("")
        .positive()
        .required(),
        //TODO validate the current day as a max date 
    dateRequired: Joi.date()
        .required()
        .empty(null)
        .max( new Date() ),
    emailRequired: Joi.string()
        .email({tlds:false})
        .empty(""),
    passwordRequired: Joi.string()
        .alphanum()
        .min(6)
        .required()
};

export default validations;