import { Router } from "express";
import transactionCategoryController from "../controllers/transactionCategory";
import { isLoggedin } from "../middlewares/authorazation/authMiddleware";
import {
  createCategoryVlidator,
  updateCategoryValidator,
} from "../middlewares/validation/transactionCategoryValidator";

const routes: Router = Router();

routes.use(isLoggedin);

routes.get("/get-all", transactionCategoryController.getTransactionCategories);

routes.post(
  "/create",
  createCategoryVlidator,
  transactionCategoryController.createTransactionCategory
);

routes.patch(
  "/update/:id",
  updateCategoryValidator,
  transactionCategoryController.updateTransactionCategory
);

routes.delete(
  "/delete/:id",
  transactionCategoryController.deleteTransactionCategory
);

routes.get("/get/:id", transactionCategoryController.getTransactionCategoryById);

routes;

export = routes;
