 import { Router } from 'express';
import CommonRateLimitRouter from "@routers/rate-limit/Common"
import testingRouter from './testing';

const indexRouter = Router()


indexRouter.use("/api/rate-limit/common/create",CommonRateLimitRouter)
indexRouter.use("/testing",testingRouter)

export default indexRouter
