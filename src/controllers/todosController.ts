
import { Request, Response } from "express";
import TodosModel from "../models/todosModel";

export default class TodosController {
    //propietats
    private model: TodosModel;


    //mètodes
    constructor(db: any) {
        this.model = new TodosModel(db);
    }

    async getToDos(req: Request, res: Response) {
        try {
            const todos = await this.model.getAll();
            res.status(200).json(todos);
        } catch (error) {
            console.error("Error obtenint TODOs:", error);
            res.status(500).json({ error: "No s'han pogut obtenir els TODOs" });
        }
    }

    async getToDo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const todo = await this.model.getById(Number(id));

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

    async getToDosPrioritat(req: Request, res: Response) {
        try {
        const { prioritat } = req.params;
            const todos = await this.model.getByPrioritat(prioritat);
            res.status(200).json(todos);
        } catch (error) {
            console.error("Error obtenint els TODOs per prioritat:", error);
            res.status(500).json({ error: "Error en recuperar els TODOs per prioritat" });
        }
    }

    async createToDo(req: Request, res: Response) {
        try {
            const { titol, descripcio, completat, prioritat } = req.body;

            if (titol === undefined) {
                res.status(400).json({ error: "El camp 'titol' és obligatori" });
                return;
            }

            // Creo objecte 'data' amb les dades del body
            const data: any = { titol };
            if (descripcio !== undefined) data.descripcio = descripcio;
            if (completat !== undefined) data.completat = completat;
            if (prioritat !== undefined) data.prioritat = prioritat;

            const result = await this.model.createTodo(data);

            res.status(201).json({ message: "TODO creat correctament", id: result.lastID });
        } catch (error) {
            console.error("Error creant el TODO:", error);
            res.status(500).json({ error: "Error al crear el TODO" });
        }
    }

    async updateToDo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { titol, descripcio, completat, prioritat } = req.body;

            if (id === undefined || titol === undefined || descripcio === undefined || completat === undefined || prioritat === undefined)
            {
                res.status(400).json({ error: "Falten camps" });
                return;
            }

            const result = await this.model.updateTodo(Number(id), { titol, descripcio, completat, prioritat });

            if (!result || result.changes === 0) {
                res.status(404).json({ error: "ID passat, no trobat" });
            } else {
                res.status(201).json({ message: "TODO actualitzat correctament", id });
            }
        } catch (error) {
            console.error("Error actualitzant el TODO:", error);
            res.status(500).json({ error: "Error en actualitzar el TODO" });
        }
    }

    async deleteToDo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await this.model.deleteTodo(Number(id));

            if (!result || result.changes === 0) {
                res.status(404).json({ error: "ID passat, no trobat" });
            } else {
                res.status(200).json({ message: "TODO eliminat correctament", id });
            }
        } catch (error) {
            console.error("Error eliminant el TODO:", error);
            res.status(500).json({ error: "Error en eliminar el TODO" });
        }
    }
}
