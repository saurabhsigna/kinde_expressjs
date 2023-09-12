const { setupKinde } = require("@kinde-oss/kinde-node-express");
require("dotenv").config()
import { Express } from "express";
export default function setUpKindeConfig(app:Express) {
  

return setupKinde({
      clientId: process.env.KINDE_ID,
      issuerBaseUrl: process.env.KINDE_DOMAIN,
      siteUrl: process.env.KINDE_CALLBACK_URL,
      secret: process.env.KINDE_SECRET,
      redirectUrl: process.env.KINDE_CALLBACK_URL,
      unAuthorisedUrl:"https://mzwv6c-3000.csb.app"
    }, app);
  };

  