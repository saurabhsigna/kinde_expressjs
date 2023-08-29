var admin = require("firebase-admin");
const { getMessaging } = require("firebase-admin/messaging");
var serviceAccount = require("./key.json");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post("/send-to-single", function (req, res) {
  const { fcmToken, titleBody, msgBody, imgBody } = req.body;
  const message1 = {
    data: {
      score: "850",
      time: "2:45",
    },
    token: fcmToken,
  };
  const imageUri =
    "https://fqowltqyxgtsruobvmis.supabase.co/storage/v1/object/sign/store/00016-2169749103.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzdG9yZS8wMDAxNi0yMTY5NzQ5MTAzLnBuZyIsImlhdCI6MTY5MzAyOTYwNCwiZXhwIjoxNjkzNjM0NDA0fQ.bGf6uw0sRU7OhBzBHdwRaLO4QVAk_nBfNTHh23ruXGY&t=2023-08-26T06%3A00%3A04.424Z";
  // See documentation on defining a message payload.
  const message2 = {
    token: fcmToken,

    notification: {
      title: titleBody ? titleBody : "$FooCorp up 1.43% on the day",
      body: msgBody
        ? msgBody
        : "$FooCorp nigga 11.80 points to close at 835.67, up 1.43% on the day.",
      image: imgBody ? imgBody : imageUri,
    },

    webpush: {
      headers: {
        Urgency: "high",
      },
    },
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  getMessaging()
    .send(message1)
    .then((response) => {
      // Response is a message ID string.
      res.send("done");
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      res.status(500).send(error.message);
    });
});

let tokens = [];
app.post("/store", (req, res) => {
  const { fcm_token } = req.body;
  if (!fcm_token) res.status(500).json({ error: "no token found" });
  const isTokenPresent = tokens.some((token) => token == fcm_token);
  if (!isTokenPresent) tokens.push(fcm_token);
  res.json({ message: "done" });
});

app.get("/store", (req, res) => {
  res.send(tokens);
});
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
