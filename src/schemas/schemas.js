import Joi from "joi";

const schemas = {
  cakesSchema: Joi.object().keys({
    name: Joi.string().min(2).trim().required(),
    price: Joi.number().required(),
    description: Joi.string().trim().required(),
    image: Joi.string().trim().required(),
  }),
};

export { schemas };
