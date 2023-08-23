const express = require("express");
const {
  setupKinde,
  protectRoute,
  getUser,
} = require("@kinde-oss/kinde-node-express");

const app = express();

const config = {
  clientId: process.env.KINDE_ID,
  issuerBaseUrl: process.env.ISSUER_URL,
  siteUrl: process.env.SITE_URI,
  secret: process.env.KINDE_SECRET,
  redirectUrl: process.env.KINDE_REDIRECT_URI,
};


setupKinde(config, app);

app.listen(3000, () => console.log("hello"));
