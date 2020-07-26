import { Request, Response } from "express";
import * as express from "express";
import { Controller } from "../controller/controller";
class Routes {
  private controller: Controller;
  constructor() {
    this.controller = new Controller();
  }
  public routes(app): void {
    app.route("/todos").get(this.controller.getAllToDos);
    app.route("/todo/new").post(this.controller.newTodo);

    // following code is to handle http://localhost:3000/superHero request.
    // app.route("/ToDo");
    //   .get(this.controller.getAllToDo)
    //   .post(this.controller.addToDo);
    // following code is to handle http://localhost:3000/superHero/{superHeroId} request.
    // app.route('/superHero/:superHeroId')
    //     .get(this.controller.getSuperHeroById)
    //     .put(this.controller.updateSuperHero)
    //     .delete(this.controller.deleteSuperHero);

    // Serve client routes
    app.use(express.static("client"));
  }
}
export { Routes };
