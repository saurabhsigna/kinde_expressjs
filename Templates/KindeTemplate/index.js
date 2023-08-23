const express = require("express");
const cors = require("cors");
const {
  setupKinde,
  protectRoute,
  getUser,
} = require("@kinde-oss/kinde-node-express");

const app = express();

app.use(
    cors({
      origin: [
        process.env.FRONTEND_URI,
       
      ],
      credentials: true,
    })
  );

const config = {
  clientId: process.env.KINDE_ID,
  issuerBaseUrl: process.env.ISSUER_URL,
  siteUrl: process.env.SITE_URI,
  secret: process.env.KINDE_SECRET,
  redirectUrl: process.env.KINDE_REDIRECT_URI,
};

setupKinde(config, app);

app.listen(process.env.PORT, () =>
  console.log(`🚀 App is running on PORT : ${process.env.PORT} 🚀`)
);
