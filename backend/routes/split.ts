import { Router } from "express";
import splitController from "../controllers/split";
import { isLoggedin } from "../middlewares/authorazation/authMiddleware";

const routes: Router = Router();

routes.use(isLoggedin);

routes.get(
  "/get-my-wallet-transaction/:tourId",
  splitController.getMyWalletTransactions
);

export = routes;
