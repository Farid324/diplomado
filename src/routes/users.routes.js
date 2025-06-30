//src/routes/users.routes.js
import { Router } from "express";
import userController from "../controllers/users.controller.js";

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
.post(userController.createUser);
export default router;