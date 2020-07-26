import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Project from "./Project";

@Entity()
export class ToDo {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public task: string;

  @Column()
  public completed: boolean;

  @Column()
  public duedate: Date;

  @ManyToOne((type) => Project, (owner) => owner.id)
  public todo: Project;
}
export default ToDo;
