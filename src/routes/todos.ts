// src/routes/todos.ts
import express from "express";
import todosController from "../controllers/todosController";

const router = express.Router();

/*GET*/
// Ruta per recuperar tots els TODOs
router.get("/", todosController.getToDos);

// Ruta per recuperar un TODO per id
router.get("/:id", todosController.getToDo);

export default router;
