import Joi from "joi";

const schemas = {
  cakesSchema: Joi.object().keys({
    name: Joi.string().min(2).trim().required(),
    price: Joi.number()
      .required()
      .custom((value, helpers) => {
        if (value <= 0) {
          return helpers.message('"price" must be greater than 0');
        }
        return value;
      }),
    description: Joi.string().trim().required(),
    image: Joi.string().uri().trim().required(),
  }),
  clientsSchema: Joi.object().keys({
    name: Joi.string().min(3).trim().required(),
    address: Joi.string().trim().required(),
    phone: Joi.string()
      .regex(/^\d{10,11}$/)
      .required(),
  }),
  ordersSchema: Joi.object().keys({
    clientId: Joi.number().integer().positive().required(),
    cakeId: Joi.number().integer().positive().required(),
    quantity: Joi.number().integer().min(1).max(4).required(),
    totalPrice: Joi.number().precision(2).positive().required(),
  }),
};

export { schemas };
