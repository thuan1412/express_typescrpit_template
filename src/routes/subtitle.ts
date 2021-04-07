import { Router } from "express";
import { addSubtitle, getSubtitle } from "../controllers/subtitle";
import multer from "multer";
import { authMiddleware } from "../middlewares";

const upload = multer({ dest: "upload-files" });
const router = Router();

router.post("/", authMiddleware, upload.single("srtFile"), addSubtitle);

router.get("/:id", getSubtitle);

export default router;
