import {
  Request,
  Response,
  NextFunction,
  Router,
} from "../node_modules/express";
import { connectionPromise } from "../connection/Connection";
import DueDate from "../entity/Project";
import ToDo from "../entity/ToDo";
class Controller {
  connection;
  constructor() {
    this.initController();
  }

  public async initController() {
    console.log("initializing controller");
    this.connection = await connectionPromise;
    await this.connection.synchronize();
  }

  // public DueDate(req: Request, res: Response) {
  //   connection
  //     .then(async (connection) => {
  //       const dueDate = await connection.manager.find(Date);
  //       res.json(dueDate);
  //     })
  //     .catch((error) => {
  //       console.error("Error ", error);
  //       res.json(error);
  //     });
  // }
  //https://typeorm.io/#/select-query-builder
  // Generates a response to the frontend
  public async getAllToDos(req: Request, res: Response) {
    const connection = await connectionPromise;
    const todos = await connection
      .createQueryBuilder()
      .select("todo")
      .from(ToDo, "todo")
      .execute();
    console.log(todos)
    res.send({todos});
  }

  //  {"todos":[{"task":"Finish Project","id":"testid123","done":false}]}
  //https://www.postman.com/downloads/
  //https://chrome.google.com/webstore/detail/postman-interceptor/aicmkgpgakddgnaphhhpliifpcfhicfo?hl=en
  //https://typeorm.io/#/insert-query-builder
  public async newTodo(req: Request, res: Response) {
    const connection = await connectionPromise;
    connection
      .createQueryBuilder()
      .insert()
      .into(ToDo)
      .values(req.body.todos)
      .execute();
    res.send({ message: "TODO ADDED" });
  }

  public async updateTodo(req: Request, res: Response) {
    const connection = await connectionPromise;

    connection
      .createQueryBuilder()
      .update(ToDo)
      .set({task: req.body.todo.task, completed: req.body.todo.completed})
      .where("id= :id", {id: req.body.todo.id} )
      .execute();
    res.send({ message: "TODO ADDED" });
  }

  public async deleteTodo(req: Request, res: Response) {
    const connection = await connectionPromise;
    console.log(req.body)
    console.log(req.body.ids)
    connection
      .createQueryBuilder()
      .delete()
      .from(ToDo)
      .where("id IN(:...ids)", { ids: req.body.ids})
      .execute();
    console.log("deleteing")
    res.send('');
  }
}
//         superHero.name = requestSuperHero.name;
//         superHero.power = [];
//         // delete previous power of our super-hero
//         superHero.power.forEach(async (power) => {
//           await connection.manager.remove(Power, { id: power.id });
//         });
//         // add new power to our super-hero
//         requestPower.forEach((requestPower) => {
//           let power: Power = new Power();
//           power.ability = requestPower;
//           superHero.power.push(power);
//         });
//         await connection.manager.save(superHero);
//         res.json({ message: "Successfully Updated." });
//       })
//       .catch((error) => {
//         console.error("Error ", error);
//         res.json(error);
//       });
//   }
//   public getSuperHeroById(req: Request, res: Response) {
//     connection
//       .then(async (connection) => {
//         let superHero = await connection.manager.findOne(
//           SuperHero,
//           req.params.superHeroId
//         );
//         res.json(superHero);
//       })
//       .catch((error) => {
//         console.error("Error ", error);
//         res.json(error);
//       });
//   }
//   public deleteSuperHero(req: Request, res: Response) {
//     connection
//       .then(async (connection) => {
//         let superHero = await connection.manager.findOne(
//           SuperHero,
//           req.params.superHeroId
//         );
//         // delete all power first
//         superHero.power.forEach(async (power) => {
//           await connection.manager.remove(Power, { id: power.id });
//         });
//         // delete our super-hero
//         await connection.manager.remove(SuperHero, {
//           id: req.params.superHeroId,
//         });
//         res.json({ message: "Successfully Removed." });
//       })
//       .catch((error) => {
//         console.error("Error ", error);
//         res.json(error);
//       });
//   }

export { Controller };
