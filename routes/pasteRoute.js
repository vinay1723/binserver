import express from "express";
import pasteController from "../controllers/pasteController.js";

const router = express.Router();

router.get("/healthz", pasteController.healthCheck);
router.post("/pastes", pasteController.createPaste);
router.get("/pastes/:id", pasteController.getPaste);
router.get("/p/:id", pasteController.viewPasteHTML);

export default router;
