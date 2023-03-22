import { STATUS_CODE } from "../enums/statusCode.js";

export default function schemaValidator(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((detail) => detail.message);
      if (message.includes('"image" must be a valid uri')) {
        return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(message);
      }

      return res.status(STATUS_CODE.BAD_REQUEST).send(message);
    }
    next();
  };
}
