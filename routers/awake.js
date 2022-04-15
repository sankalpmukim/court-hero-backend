import { Router } from "express";
import { setAwake, setNotAwake } from "../firebase/firestore.js";

const router = Router();

router.post("/", async (req, res) => {
  const { id } = req.body;
  await setAwake(id);
  res.sendStatus(200);
});

router.post("/dead", async (req, res) => {
  const { id } = req.body;
  await setNotAwake(id);
  res.sendStatus(200);
});

export default router;
