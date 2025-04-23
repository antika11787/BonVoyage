import { Router } from "express";
import { isLoggedin } from "../middlewares/authorazation/authMiddleware";
import { transactionCreateValidator } from "../middlewares/validation/transactionValidator";
import transactionController from "../controllers/transaction";

const routes: Router = Router();

routes.use(isLoggedin);

routes.post(
  "/create",
  transactionCreateValidator,
  transactionController.createTransaction
);

routes.delete(
  "/delete/:id",
  transactionController.deleteTransaction
);

routes.patch(
  "/update/:id",
  transactionCreateValidator,
  transactionController.updateTransaction
)

export = routes;
