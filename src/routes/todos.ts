// src/routes/todos.ts
import express from "express";
import TodosController from "../controllers/TodosController";
import { tokenAutentificador } from "../middleware/jwt";


const crearRoutes = (db: any)  => {
    const router = express.Router();
    const todosController = new TodosController(db);

    /*GET*/
    // Per recuperar tots els TODOs
    router.get("/", todosController.getToDos.bind(todosController));

    // Per recuperar un TODO per id
    router.get("/:id", todosController.getToDo.bind(todosController));

    // Per recuperar els TODOs per prioritat
    router.get("/prioritat/:prioritat", todosController.getToDosPrioritat.bind(todosController));

    /*POST*/
    router.post("/", tokenAutentificador, todosController.createToDo.bind(todosController));

    /*UPDATE*/
    router.put("/:id", tokenAutentificador, todosController.updateToDo.bind(todosController));


    /*DELETE*/
    router.delete("/:id", tokenAutentificador, todosController.deleteToDo.bind(todosController));

    return router
}


export default crearRoutes;
