import { Server, Socket } from "socket.io";
import { getRepository } from "typeorm";
import EditAction from "../entities/edit-action.entity";
import Note from "../entities/note.entity";

import noteServices from "../services/note.service";

interface NoteData {
  noteId: number;
  currentData: string;
  operations: any[];
}

let noteData: NoteData[] = [];

export default (io: Server) => {
  io.on("connection", (socket: Socket) => {
    const editActionRepo = getRepository(EditAction);
    const noteRepo = getRepository(Note);
    let note: Note | undefined;

    socket.on("noteOpen", async (noteId: number) => {
      console.log("open note", noteId);
      note = await noteRepo.findOne(noteId);
      noteData.push({
        noteId: noteId,
        operations: [],
        currentData: note?.content as string,
      });
    });

    socket.on("editorAction", (data: any) => {
      try {
        const { noteId, ...action } = data;
        console.log("On action: ", data);
        const note = noteData.find((note) => note.noteId === noteId);
        if (!note) {
          return;
        }
        note?.operations.push(action);
        if ((note?.operations.length as number) > 20) {
          console.log("notedata", noteData);
          note.currentData = noteServices.applyChange(
            note.currentData,
            note.operations
          );
          note.operations = [];
          console.log("new string: ", note.currentData);
          noteRepo.update(noteId, { content: note.currentData });
        }
        editActionRepo.save({
          noteId: noteId,
          action: action,
          actionTime: new Date(),
        });
        console.log("actionnn", noteId);
      } catch (err) {
        console.log(err);
      } finally {
        socket.broadcast.emit("editorAction", data);
      }
    });

    socket.on("disconnect", () => {
      if (note) {
        const noteAction = noteData.find((elem) => elem.noteId === note?.id);
        console.log(noteData);
        if (!noteAction) {
          return;
        }
        console.log('disconnect', note, noteAction);
        noteAction.currentData = noteServices.applyChange(
          noteAction.currentData,
          noteAction.operations
        );
        noteRepo.update(note.id, { content: noteAction.currentData });
        noteAction.operations = [];
      }
    });
  });
};
