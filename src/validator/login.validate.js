// src/validators/login.validate.js
import joi from "joi";

export const loginSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});