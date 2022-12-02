import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { randomUUID } from "crypto";
import { Course } from "./Course";
@Entity("users")
export class User {
  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column({
    name: "hashed_password",
    transformer: {
      to(value) {
        // make hashing
        return value + " hashed";
      },
      from(value) {
        return value;
      },
    },
  })
  hashedPassword: string;
  @ManyToMany(() => Course)
  @JoinTable({ name: "users_user_courses_courses" })
  courses: Course[];
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
