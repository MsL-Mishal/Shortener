import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: "30d" }, // URLs expire after 30 days
});

const Url = mongoose.model("Url", urlSchema);

export default Url;
