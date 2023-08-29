import { Request, Response, Express } from "express";
import * as express from "express";
import 'module-alias/register';

import { recaptchaMiddleware } from "@contents/middlewares/RecaptchaMiddleware";

const app: Express = express();
app.use(express.json());

app.post("/post",recaptchaMiddleware, (req: Request, res: Response) => {
  const { inputVal } = req.body;

  // Handle the rest of your route logic here

  res.send("Human 👨 👩");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
