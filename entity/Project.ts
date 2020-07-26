import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ToDo from "./ToDo";

@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public name: string;
  @OneToMany((type) => ToDo, (todos) => todos.id)
  public todos: ToDo[];
}
export default Project;
