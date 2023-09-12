const fs = require("fs").promises
import { Request,Response } from "express"
const path = require("path")
import {z} from "zod"
import {fromZodError} from "zod-validation-error"
import {MakeRateLimiter}  from '@contents/middlewares/RateLimitMiddleware'
const ReqBodySchema = z.object({
  windowMS:z.number().int(),
  max:z.number().int(),
  message:z.string().optional()
})

type ReqBodyType = z.infer<typeof ReqBodySchema>;

export async function AddCommonRateLimit(req:Request,res:Response){
    const {windowMS,max,message}:ReqBodyType = req.body
    
    const mainFolder = path.join(__dirname, "../../outputs", "MyTemplate");
    const requestsFolder = path.join(mainFolder, "requests");


try {
  try {
    ReqBodySchema.parse({
     windowMS,max,message
    });
  } catch (err:any) {
    const validationError = fromZodError(err);

    console.log(validationError);
  } 

  fs.writeFile(path.join(requestsFolder, "GET.js"), MakeRateLimiter(60 * 60 * 100,5,"too many messages"), (err:any) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("File written successfully.");
    }
  })



  
} catch (error:any) {
  res.status(500).json({error:error.message})
}

}

