
const express = require('express');
const fs = require('fs-extra');
const cors = require(`cors`)
const { setupKinde, protectRoute, getUser } = require("@kinde-oss/kinde-node-express");


const app = express();
app.use(cors);
// rate-limiting code here
// other execution code here
const config = {
  clientId: process.env.KINDE_ID,
  issuerBaseUrl: process.env.ISSUER_URL,
  siteUrl: process.env.SITE_URI,
  secret: process.env.KINDE_SECRET,
  redirectUrl: process.env.KINDE_REDIRECT_URI,
};
setupKinde(config, app);

// router code here
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
