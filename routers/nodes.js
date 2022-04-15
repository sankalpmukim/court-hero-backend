import { Router } from "express";
import {
  getNodes,
  getNodesByBlock,
  getNodesByBlockAndIndex,
} from "../firebase/firestore.js";

const router = Router();

// get all nodes
router.get("/", async (req, res) => {
  console.log("get all nodes");
  const nodes = await getNodes();
  return res.json({ data: nodes });
});

// get all nodes in a block
router.get("/:block", async (req, res) => {
  const { block } = req.params;
  const nodes = await getNodesByBlock(block);
  return res.json({ data: nodes });
});

// get all nodes in a block and index
router.get("/:block/:index", async (req, res) => {
  const { block, index } = req.params;
  const nodes = await getNodesByBlockAndIndex(block, index);
  return res.json(nodes);
});

export default router;
