import Router from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // boilerplate
const __dirname = path.dirname(__filename); // boilerplate

const router = Router();

router.get("^/$|/index(.html)?", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

export default router;
