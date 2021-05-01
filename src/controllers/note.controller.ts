import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Note from "../entities/note.entity";

interface CreateNoteData {
  name: string;
  content: string;
}

const createNote = async (req: Request, res: Response) => {
  const note = new Note();
  const noteRepo = getRepository(Note);
  note.content = "";
  note.name = "Untitled";
  await noteRepo.save(note);
  res.json(note);
};

const getNote = async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const noteRepo = getRepository(Note);

  const note = await noteRepo.findOne(noteId);
  res.json(note);
};

const updateNote = async (req: Request, res: Response) => {
  const noteData = req.body;
  const noteId = parseInt(req.params.id as string);
  const noteRepo = getRepository(Note);

  console.log(noteData);
  await noteRepo.update({ id: noteId }, { content: noteData.content });
  const note = await noteRepo.findOne(noteId);
  res.json(note);
};

const exportNote = async (req: Request, res: Response) => {};

export default { createNote, getNote, updateNote };
