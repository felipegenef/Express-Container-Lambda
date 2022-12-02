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
import { User } from "./User";
@Entity("courses")
export class Course {
  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
  @PrimaryColumn()
  id: string;
  @Column()
  title: string;
  @Column()
  logo: string;
  @Column()
  poster: string;
  @Column()
  color: string;
  @Column()
  minutes: number;
  @Column()
  description: string;
  @ManyToMany(() => User)
  @JoinTable({ name: "users_user_courses_courses" })
  users: User[];
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
}
