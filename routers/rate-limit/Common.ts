import {Router,Request,Response} from "express"
import { AddCommonRateLimit} from "@controllers/rateLimit/CommonController"

const commonRouter = Router();


commonRouter.post("/",AddCommonRateLimit)


export default commonRouter