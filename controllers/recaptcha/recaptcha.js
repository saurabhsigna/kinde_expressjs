"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
require("module-alias/register");
var RecaptchaMiddleware_1 = require("@contents/middlewares/RecaptchaMiddleware");
var app = express();
app.use(express.json()); 
app.post("/post", RecaptchaMiddleware_1.recaptchaMiddleware, function (req, res) {
    var inputVal = req.body.inputVal;
    // Handle the rest of your route logic here
    res.send("Human 👨 👩");
});
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
