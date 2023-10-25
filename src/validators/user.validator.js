import Joi from "joi";

const userValidator = Joi.object({
  name: Joi.string().min(1).max(255).required().messages({
    "string.pattern.base": "Name should include min 1 max 255 characters",
  }),
  email: Joi.string().min(1).max(254).required().messages({
    "string.pattern.base": "Email should include min 1 max 254 characters",
  }),
  birthday_date: Joi.string().required(),
  phone_number: Joi.string().min(1).max(20).required().messages({
    "string.pattern.base": "Phone should include min 1 max 20 characters",
  }),
  address: Joi.string().min(1).required().messages({
    "string.pattern.base": "Address should include min 1 character",
  }),
});

export { userValidator };
