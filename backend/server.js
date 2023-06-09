import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/dbConn.js";

import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import corsOptions from "./config/corsOptions.js";
import errorHandler from "./middleware/errorHandler.js";
import { logEvents, logger } from "./middleware/logger.js";
import authRouter from "./routes/authRoutes.js";
import noteRouter from "./routes/noteRoutes.js";
import rootRouter from "./routes/root.js";
import userRouter from "./routes/userRoutes.js";

const __filename = fileURLToPath(import.meta.url); // boilerplate
const __dirname = dirname(__filename); // boilerplate

config();
console.log(process.env.NODE_ENV);

const app = express();
const PORT = process.env.PORT || 3500;

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(join(__dirname, "public")));
app.use("/", rootRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.log(error);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
