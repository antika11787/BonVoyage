import express from "express";
const dotenv = require("dotenv");
import { handleSyntaxError } from "../utils/errorHandler";
const cors = require("cors");
import auth from "./auth";
import user from "./user";
import tour from "./tour";
import transactionCategory from "./transactionCategory";
import tourMember from "./tourMember";
import transaction from "./transaction";
import split from "./split";

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(handleSyntaxError);

app.use("/auth", auth);
app.use("/user", user);
app.use("/tour", tour);
app.use("/transactionCategory", transactionCategory);
app.use("/tour-member", tourMember);
app.use("/transaction", transaction);
app.use("/split", split);

export = app;