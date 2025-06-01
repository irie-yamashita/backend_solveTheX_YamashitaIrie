import express from "express";
import { connectDB } from "./db";

const app = express();
const port = process.env.PORT || 3000; //si no especifico res, poso per defecte el port 3000


app.use(express.json()); //per convertir body a json

app.get("/", async (req, res) => {

    const db = await connectDB();
    res.send("Connexió db correcte i creació de taules feta!");
});

app.listen(port, () => {
    console.log(`Servidor en funcionament a http://localhost:${port}`);
});
