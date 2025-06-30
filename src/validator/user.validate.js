//src/validators/user.validate.js
import joi from 'joi';

export const createUserSchema = joi.object({
    username: joi.string().required().alphanum().min(3).max(30),
    password: joi.string().required().min(6).max(30),
});