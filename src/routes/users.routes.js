//src/routes/users.routes.js
import { Router } from "express";
import userController from "../controllers/users.controller.js";
import { createUserSchema } from "../validators/user.validate.js";
import validate from '../validators/validate.js';

const router = Router();

//Routes
/*router.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Users API",
    });
})*/

router
.route('/')
.get(userController.getUsers)
.post(validate(createUserSchema, 'body'), userController.createUser);
export default router;