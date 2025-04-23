import { Router } from "express";
import userController from "../controllers/user";
import { update, updateProfile } from "../middlewares/validation/userValidator";

import { paginationValidator } from "../middlewares/validation/paginationValidator";
import {
  isAdmin,
  isLoggedin,
} from "../middlewares/authorazation/authMiddleware";

const routes: Router = Router();

routes.use(isLoggedin);

routes.get("/profile", userController.getMyProfile);

routes.put("/update-profile", updateProfile, userController.updateProfile);

routes.get("/get-all", paginationValidator, userController.getAllUser);

routes.get("/get/:id", userController.getUserById);

routes.use(isAdmin);

routes.delete("/delete/:id", userController.deleteUser);

routes.put("/update/:id", update, userController.updateUser);

routes;

export = routes;
