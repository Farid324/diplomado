import { Router } from "express";
import userController from "../controllers/users.controller.js";

const router = Router();

//Routes
/*router.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Users API",
    });
})*/

router.get("/", userController.getUsers);

export default router;