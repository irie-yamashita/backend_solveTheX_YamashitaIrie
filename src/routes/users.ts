// src/routes/todos.ts
import express from "express";
import UsersController from "../controllers/UsersController";


const crearRoutes = (db: any)  => {
    const router = express.Router();
    const controlador = new UsersController(db);

    // Per obtenir els usernames de tots els usuaris
    router.get("/", controlador.getUsuaris.bind(controlador));

    // Per registrar usuaris
    router.get("/registrar", controlador.registrar.bind(controlador));

    // Per iniciar sessió (login)
    router.get("/login", controlador.login.bind(controlador));


    return router
}


export default crearRoutes;
