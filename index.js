import express from "express";
import bodyParser from "body-parser";
import AwakeRouter from "./routers/awake.js";
import NodesRouter from "./routers/nodes.js";
import LoopRouter from "./routers/loop.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// server status at root
app.get("/", (req, res) => {
  res.send("server is running");
});

// possible middleware here

// routes
app.use("/awake", AwakeRouter);
app.use("/nodes", NodesRouter);
app.use("/loop", LoopRouter);

app.all("*", (req, res) => res.sendStatus(404));
const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on port ${PORT}`);
});
