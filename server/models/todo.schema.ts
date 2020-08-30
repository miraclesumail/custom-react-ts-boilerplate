import mongoose from "mongoose";

const schema = new mongoose.Schema({
  task: String,
  date: String,
  status: Number,
  createdBy: String
});

export default mongoose.model("Todo", schema);
