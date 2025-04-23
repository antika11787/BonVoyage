import { Router } from "express";
import tourMember from "../controllers/tourMember";
import { isLoggedin } from "../middlewares/authorazation/authMiddleware";
import { addMemberValidation , removeMemberValidation , promoteMemberValidation } from "../middlewares/validation/tourMemberValidation";

const routes: Router = Router();

routes.use(isLoggedin);

routes.post("/add-member",addMemberValidation ,tourMember.addMember);

routes.delete("/remove-member/:tourId/:userId", removeMemberValidation ,tourMember.removeMember);   

routes.put("/promote-member",promoteMemberValidation, tourMember.promoteMember);

routes.get("/get-member/:tourId", tourMember.getTourMembers);

routes.get("/get-my-tours", tourMember.getMyTours);

routes.delete("/leave-tour/:tourId", tourMember.leaveTour);




export = routes;


