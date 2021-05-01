import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "note",
})
export default class Note {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  content: string;
}

