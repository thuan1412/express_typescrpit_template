import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import UserCredentials from "./user-credentials";

@Entity({
  name: "user",
})
export default class User {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column("text")
  username: string;

  @Column({type:"text"})
  email: string;

  @Column({ name: "first_name", type: "text" })
  firstName: string;

  @Column({ name: "last_name", type: "text" })
  lastName: string;

  @OneToOne(
    () => UserCredentials,
    (userCredentials) => userCredentials.user_id,
    { cascade: true }
  )
  @JoinColumn({ name: "id", referencedColumnName: "user_id" })
  userCredentials: UserCredentials;
}
