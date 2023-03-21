import { STATUS_CODE } from "../enums/statusCode.js";

export default function schemaValidator(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((detail) => detail.message);
      if (message.includes('"name" is not allowed to be empty')) {
        return res.status(STATUS_CODE.BAD_REQUEST).send(message);
      }
      if (
        message.includes('"name" length must be at least 2 characters long')
      ) {
        return res.status(STATUS_CODE.BAD_REQUEST).send(message);
      }
      return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(message);
    }
    next();
  };
}
