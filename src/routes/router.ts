import waitlists from "../controllers/waitlist";
import express, { Router } from "express";
import { waitlistValidator } from "../validators/waitlistValidators";
import joiMiddleware from "../middlewares/joiMiddleware";

const waitlistRouter: Router = express.Router();

waitlistRouter.post("/waitlist", joiMiddleware(waitlistValidator), waitlists);

export default waitlistRouter;
