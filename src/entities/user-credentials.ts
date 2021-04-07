import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "user_credentials",
})
export default class UserCredentials {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column('text')
  user_id: number;

  @Column('text')
  password: string;
}
