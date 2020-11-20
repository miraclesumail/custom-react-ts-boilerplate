import { Router } from "express";
import { promisify } from "util";
import { redisClient } from "../../src";
import { commands } from "../config";
import { ratesLimit } from "../middlewares";
import Todo from "../models/todo.schema";
const router = Router();
console.log(redisClient, "redisClient");

router.use("/", (req: any, res, next) => {
  req.redisClient = {};
  commands.forEach((command) => {
    req.redisClient[command] = promisify(redisClient[command]).bind(
      redisClient
    );
  });
  next();
});

const todo = new Todo({
  date: "2020-08-30",
  task: "sleeping",
  status: 1,
  createdBy: "sumail",
});

router.get("/weather", ratesLimit("count", 20), async (req, res) => {
  console.log("whowho");
  const data = await todo.save();
  console.log(data);
  res.json({ msg: "ok" });
  //   redisClient.get("qq", (err, val) => {
  //     res.json({ msg: val });
  //   });
});

router.post("/getTodo", async (req, res) => {
  const { task } = req.body;
  const todo = await Todo.findOne({ task }).exec();
  res.json({ msg: "ok", todo });
});

export default router;
