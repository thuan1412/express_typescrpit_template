import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
  name: "edit_action",
})
export default class EditAction {
  @PrimaryColumn({ name: "id", type: "int" })
  id: number;

  @Column({ type: "jsonb", name: "action" })
  action: any;

  @Column({ type: "timestamptz", name: "action_time" })
  actionTime: Date;

  @Column({ type: "int", name: "note_id" })
  noteId: number;
}
