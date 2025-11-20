import express from "express";
import cors from "cors";
import linkRoutes from "../src/routes/linkRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

app.use("/api", linkRoutes);
app.use("/", linkRoutes);

export default app;
