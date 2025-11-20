import express from "express";
import {
  createLink,
  getLinks,
  getLinkStats,
  deleteLink,
  redirectLink
} from "../controllers/linkController.js";
import { validateUrl } from "../middleware/validateUrl.js";

const router = express.Router();

router.post("/links", validateUrl, createLink);
router.get("/links", getLinks);
router.get("/links/:code", getLinkStats);
router.delete("/links/:code", deleteLink);

// redirect route
router.get("/:code", redirectLink);

export default router;
