import { Request, Response } from "express";
const express = require("express");
const databaseConnection = require("./config/db");
import index from "./routes/index";
import { createTransporter } from "./config/email";

const app = express();

app.use("/api/v1", index);

app.route("*").all((req: Request, res: Response) => {
  res.status(400).send("Invalid route!");
});

databaseConnection(() => {
  app.listen(8000, () => {
    console.log("Server is running on port 8000...");
  });
});

createTransporter();
