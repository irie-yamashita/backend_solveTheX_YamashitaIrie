import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generarToken } from "../utils/gestionarJWT";
import { UserModel } from "../models/UserModel";

export default class UserController {
    //propietats
    private model: UserModel;

    //mètodes
    constructor(db: any) {
        this.model = new UserModel(db);
    }

    async getUsuaris (req: Request, res: Response) {
        try {
            const usuaris = await this.model.getUsers();
            res.status(200).json(usuaris);
        } catch (error) {
            console.error("Error obtenint usuaris:", error);
            res.status(500).json({ error: "No s'han pogut obtenir els usuaris" });
        }
    }

    async registrar (req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            // Comprovar si l'usuari ja existeix
            const existeix = await this.model.getUser(username);
            if (existeix) {
                res.status(409).json({ error: "El nom d'usuari ja està registrat!!" });
                return;
            }

            // Encripto la contrasenya amb bcrypt
            const contrsEncriptada = await bcrypt.hash(password, 10);

            // Creo usuari nou
            await this.model.crearUser({ username, password: contrsEncriptada });
            res.status(201).json({ message: "Usuari registrat correctament"});

        } catch (error) {
            res.status(500).json({ error: "Error en registrar l'usuari" });
            return;
        }
    }

    async login (req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            // Busco usuari a la db
            const user = await this.model.getUser(username);
            if (!user) {
                res.status(401).json({ error: "Usuari o contrasenya incorrecta" });
                return;
            }

            // Comparo contrasenya encriptada
            const contraCorrecta = await bcrypt.compare(password, user.password);
            if (!contraCorrecta) {
                res.status(401).json({ error: "Usuari o contrasenya incorrecta" });
                return;
            }


            // Genero un token JWT
            const token = generarToken(user.id);
            res.status(200).json({ token, user: { id: user.id, username: user.username } }); //retorno el token, l'id i el nom de l'usuari

        } catch (error) {
            res.status(500).json({ error: "Error en iniciar sessió" });
            return;
        }
    }
}

