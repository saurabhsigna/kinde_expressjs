import { NextFunction, Request, Response } from "express";

type ReqBody = {
  token: string;
};
const axios = require("axios");
const recaptchaMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token }: ReqBody = req.body;
  try {
    // Sending secret key and response token to Google Recaptcha API for authentication.
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
    );

    // Check response status and proceed to the next middleware or route
    if (response.data.success) {
      next(); // Proceed to the next middleware/route
    } else {
      res.status(403).send("Robot 🤖"); // Forbidden
    }
  } catch (error) {
    // Handle any errors that occur during the reCAPTCHA verification process
    console.error(error);
    res.status(500).send("Error verifying reCAPTCHA");
  }
};

export { recaptchaMiddleware };
