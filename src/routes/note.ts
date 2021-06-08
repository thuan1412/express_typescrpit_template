import { Router } from "express";
import noteController from "../controllers/note.controller";

const router = Router();
router.post("/notes", noteController.createNote);
router.get("/notes", noteController.getNotes);
router.get("/notes/:id", noteController.getNote);
router.put("/notes/:id", noteController.updateNote);
router.patch("/notes/:id", noteController.patchNote);
export default router;
