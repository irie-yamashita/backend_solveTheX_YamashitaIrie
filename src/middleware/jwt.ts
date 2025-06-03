import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../utils/gestionarJWT";

export const tokenAutentificador = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Accés denegat, token requerit" });
        return;
    }

    const tokenDecodificat = verificarToken(token);
        if (!tokenDecodificat) {
            res.status(403).json({ error: "Token invàlid o caducat" });
            return;
        }

    (req as any).user = tokenDecodificat;
    next();
};
