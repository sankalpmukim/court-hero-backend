import { Router } from "express";
import {
  getNodes,
  setNodeBusy,
  setNodeFree,
  setNotAwake,
} from "./../firebase/firestore.js";
import fetch from "node-fetch";

const detectPeopleSendLog = async (node) => {
  console.log(`Pinging this node: ${JSON.stringify(node)}`);
  try {
    const { target, id } = node;
    const response = await fetch(`${target}/detect_people`).then((res) =>
      res.json()
    );
    if (!!response.detect_people && response.detect_people) {
      console.log(`${id} id detected people`);
      await setNodeBusy(id);
    } else {
      console.log(`${id} id did not detect people`);
      await setNodeFree(id);
    }
  } catch (error) {
    console.error(error);
    await setNotAwake(node.id);
  }
};
const loop = async () => {
  // get all nodes
  const nodes = await getNodes();
  console.log(`${nodes.length} nodes found`);
  // filter awake nodes
  const awakeNodes = nodes.filter((node) => node.awake);
  console.log(`${awakeNodes.length} awake nodes found`);
  // display error if no nodes are awake
  if (awakeNodes.length === 0) {
    console.error("No nodes are awake");
    return false;
  }
  // for each awake node
  for (let node of awakeNodes) {
    // target url
    detectPeopleSendLog(node);
  }
};

const router = Router();

let interval;
router.get("/start", (req, res) => {
  console.log("starting loop");
  let i = 0;
  try {
    interval = setInterval(async () => {
      console.log(`loop ${i}`);
      i++;
      await loop();
    }, 30000);
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

router.get("/stop", (req, res) => {
  try {
    clearInterval(interval);
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

export default router;
