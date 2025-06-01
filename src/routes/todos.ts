// src/routes/todos.ts
import express from "express";
import { getToDos } from "../controllers/todosController";

const router = express.Router();

router.get("/", getToDos); // Ruta per recuperar tots els TODOs

export default router;
