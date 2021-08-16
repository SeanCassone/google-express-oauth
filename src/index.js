import cors from "cors";
import logger from "morgan";
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

app.get("/", (req, res) =>
  res.send("Welcome to my Google Oauth express server")
);

const port = process.env.PORT || 2000;
app.listen(port, () =>
  console.log(`Server is Running on http://localhost:${port}`)
);
