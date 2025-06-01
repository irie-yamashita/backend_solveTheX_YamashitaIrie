import { Request, Response } from "express";

const todosController = {
async getToDos(req: Request, res: Response) {
    try {
        
        const db = req.app.locals.db;
        //Faig consulta
        const todos = await db.all("SELECT * FROM todos");

        //Torno respoasta
        res.status(200).json(todos);
    } catch (error) {
        console.error("Error obtenint TODOs:", error);
        res.status(500).json({ error: "No s'han pogut obtenir els TODOs" });
    }
},

 async getToDo (req: Request, res: Response) {

    try {
        const db = req.app.locals.db;
        // Agafo l'ID de la URL
        const { id } = req.params;

        //Faig consulta de manera segura (evitar injeccions SQL)
        const todo = await db.get("SELECT * FROM todos WHERE id = ?", id);

        if (!todo) {
            res.status(404).json({ error: "TODO no trobat" });
            return;
        }

        res.status(200).json(todo);
    } catch (error) {
        console.error("Error obtenint el TODO per ID:", error);
        res.status(500).json({ error: "Error en recuperar el TODO" });
    }
}
};

export default todosController;