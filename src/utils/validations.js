import Joi from '@hapi/joi';

const today= new Date();
const tomorrow = new Date();
const validations = {
    stringRequired: Joi.string()
        .alphanum()
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
        .positive()
        .required(),
        //TODO validate the current day as a max date 
    dateRequired: Joi.date()
        .required()
};

export default validations;