import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "user",
})
export default class User {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column("text")
  first_name: string;

  @Column("text")
  last_name: string;
}
