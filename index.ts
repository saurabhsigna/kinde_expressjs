const express = require("express")
import 'module-alias/register';
import indexRouter from "./routers/Index";
import setUpKindeConfig from '@configs/KindeAuthConfig';
const {jwtVerify} = require("@kinde-oss/kinde-node-express");
const {protectRoute} = require("@kinde-oss/kinde-node-express");
const verifier = jwtVerify("https://renegade.kinde.com");
  const app = express();
  setUpKindeConfig(app)
app.use(express.json());
app.use("/",indexRouter)
app.get("/d",verifier,(req:any,res:any)=>{
  res.send("hello")
})
app.get("/", (req:any, res:any) => {
    if (req.session && req.session.kindeAccessToken) {
        res.send("You are authenticated!");
    } else {
        res.send("You are not");
    }
});


app.listen(3000, () => console.log("hello" ));
