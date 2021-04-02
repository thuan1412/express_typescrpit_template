import { Request, Response } from "express";
import srtParser from "../utils/srt-parser";

export const addSubtitle = async (req: Request, res: Response) => {
  try {
    const data = await srtParser(req.file.path);
    res.json({ id: req.file.filename, data: data.slice(0, 4) });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getSubtitle = (req: Request, res: Response) => {
  const subtitleId = req.params.id;
  res.json({ id: subtitleId });
};
