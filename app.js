import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import urlRoutes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(express.static("public"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/", urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
