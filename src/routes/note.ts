import { Router } from "express";
import noteController from "../controllers/note.controller";

const router = Router();
router.post("/notes", noteController.createNote);
router.get("/notes/:id", noteController.getNote);
router.put("/notes/:id", noteController.updateNote);
export default router;
