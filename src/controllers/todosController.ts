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

    async getToDo(req: Request, res: Response) {

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
    },

    async getToDosPrioritat(req: Request, res: Response) {

        try {
            let todos = [];
            const db = req.app.locals.db;
            // Agafo l'ID de la URL
            const { prioritat } = req.params;

            /*TODO: validar prioritats*/

            //Faig consulta de manera segura (evitar injeccions SQL)
            todos = await db.all("SELECT * FROM todos WHERE prioritat = ?", prioritat);

            res.status(200).json(todos);

        } catch (error) {
            console.error("Error obtenint els TODOs per prioritat:", error);
            res.status(500).json({ error: "Error en recuperar el TODOs per prioritat" });
        }
    },

    async createToDo(req: Request, res: Response) {

        try {
            // Extrec els valors enviats en el cos de la petició (req.body)
            const { titol, descripcio, completat, prioritat } = req.body;

            if (titol == undefined) {
                res.status(400).json({ error: "El camp 'titol' és obligatori" });
                return;
            }

            //Creo consulta dinàmica (depenent dels camps que hagi omplert)
            const data: any = { titol };
            if (descripcio !== undefined) data.descripcio = descripcio;
            if (completat !== undefined) data.completat = completat;
            if (prioritat !== undefined) data.prioritat = prioritat;

            const nomsCamps = Object.keys(data);
            const interrogants = nomsCamps.map(() => "?");
            const valorsCamps = Object.values(data);


            const sql = `INSERT INTO todos (${nomsCamps.join(", ")}) VALUES (${interrogants.join(", ")})`;


            // Faig INSERT
            const db = req.app.locals.db;
            const result = await db.run(sql, Array.from(valorsCamps));

            //Torno resposta
            res.status(201).json({ message: "TODO creat correctament", id: result.lastID });
            return;
        } catch (error) {
            console.error("Error creant el TODO:", error);
            res.status(500).json({ error: "Error al crear el TODO" });
            return;
        }
    },

    async updateToDo(req: Request, res: Response) {

        try {
            //Extrec id dels paràmetres
            const { id } = req.params;
            // Extrec els valors enviats en el cos de la petició
            const { titol, descripcio, completat, prioritat } = req.body;

            if (id == undefined || titol == undefined || descripcio == undefined || completat == undefined || prioritat == undefined) {
                res.status(400).json({ error: "Falten camps" });
                return;
            }

            const db = req.app.locals.db;
            const result = await db.run(
                "UPDATE todos SET titol = ?, descripcio = ?, completat = ?, prioritat = ? WHERE id = ?",
                titol, descripcio, completat, prioritat, id
            );

            //comprovo que s'hagi fet l'UPDATE (id inexistent)
            if (!result || result.changes === 0) {
                res.status(404).json({ error: "ID passat, no trobat" });
            } else {
                //Torno resposta
                res.status(201).json({ message: "TODO actualitzat correctament", id: id });
            }

        } catch (error) {
            console.error("Error actualitzant el TODO:", error);
            res.status(500).json({ error: "Error a l'actualitzar el TODO" });
            return;
        }
    },


    async deleteToDo(req: Request, res: Response) {
        try {
            const db = req.app.locals.db;
            const { id } = req.params;

            const result = await db.run("DELETE FROM todos WHERE id = ?", id);

            //comprovo que s'hagi fet el DELETE (id inexistent)
            if (!result || result.changes === 0) {
                res.status(404).json({ error: "ID passat, no trobat" });
            } else {
                res.status(200).json({ message: "TODO eliminat correctament", id: id });
            }

        } catch (error) {
            console.error("Error eliminant el TODO:", error);
            res.status(500).json({ error: "Error en eliminar el TODO" });
            return;
        }
    }

};

export default todosController;


/*Status Code
https://http.cat/

200 -> OK
201 -> Created

400 -> Bad Request
404 -> Not Found

500 -> Internal Server Error
*/