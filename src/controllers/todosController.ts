import { Request, Response } from "express";


export const getToDos = async (req: Request, res: Response) => {
    try {
        //Recupero db de app.locals 
        const db = req.app.locals.db;
        //Faig consulta
        const todos = await db.all("SELECT * FROM todos");

        //Torno respoasta
        res.status(200).json(todos);
    } catch (error) {
        console.error("Error obtenint TODOs:", error);
        res.status(500).json({ error: "No s'han pogut obtenir els TODOs" });
    }
};