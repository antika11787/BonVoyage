import { Router } from "express";
import tourController from "../controllers/tour";
import { isLoggedin } from "../middlewares/authorazation/authMiddleware";
import { tourCreateValidator , tourUpdateValidator } from "../middlewares/validation/tourValidator";
import { paginationValidator } from "../middlewares/validation/paginationValidator";

const routes: Router = Router();

routes.get("/get-all", paginationValidator, tourController.getAllTours);

routes.get("/get-tour/:id", tourController.getTourById);

routes.use(isLoggedin);

routes.post("/create", tourCreateValidator, tourController.createTour);

routes.put("/update/:id", tourUpdateValidator, tourController.updateTourById);

routes.delete("/delete/:id", tourController.deleteTourById);

routes;

export = routes;
