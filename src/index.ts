import express from "express";
import { connectDB } from "./db";
import todosRoutes from "./routes/todos";

const app = express();
const port = process.env.PORT || 3000; //si no especifico res, poso per defecte el port 3000


app.use(express.json()); //per convertir body a json
app.disable("x-powered-by");

app.use("/todos", todosRoutes);

app.get("/", async (req, res) => {
    //TODO: try catch
    const db = await connectDB();
    app.locals.db = db; // Guardo la db en `app.locals` per reutilitzar-la
    res.send("Connexió db correcte i creació de taules feta!");
});

app.listen(port, () => {
    console.log(`Servidor en funcionament a http://localhost:${port}`);
});
