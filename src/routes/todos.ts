// src/routes/todos.ts
import express from "express";
import todosController from "../controllers/todosController";

const router = express.Router();

/*GET*/
// Per recuperar tots els TODOs
router.get("/", todosController.getToDos);

// Per recuperar un TODO per id
router.get("/:id", todosController.getToDo);

// Per recuperar els TODOs per prioritat
router.get("/prioritat/:prioritat", todosController.getToDosPrioritat);




/*POST*/
router.post("/", todosController.createToDo);

/*UPDATE*/
router.put("/:id", todosController.updateToDo);


/*DELETE*/
router.delete("/:id", todosController.deleteToDo);

export default router;
