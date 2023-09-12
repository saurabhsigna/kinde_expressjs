import {Router,Request,Response} from "express"
import testingController from "@controllers/testing"
const { protectRoute } = require("@kinde-oss/kinde-node-express");
const testingRouter = Router();


testingRouter.post("/",protectRoute,testingController)


export default testingRouter