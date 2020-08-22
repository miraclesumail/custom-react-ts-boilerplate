import { Router } from "express";
import { promisify } from "util";
import { redisClient } from "../../src";
import { commands } from "../config";
import { ratesLimit } from "../middlewares";
const router = Router();
console.log(redisClient, "redisClient");

router.use("/", (req: any, res, next) => {
  req.redisClient = {};
  commands.forEach(command => {
    req.redisClient[command] = promisify(redisClient[command]).bind(
      redisClient
    );
  });
  next();
});

router.get("/weather", ratesLimit("count", 20), async (req, res) => {
  res.json({ msg: "ok" });
  //   redisClient.get("qq", (err, val) => {
  //     res.json({ msg: val });
  //   });
});

export default router;
