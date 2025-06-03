import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import crearRoutes from "./routes/todos";

const app = express();
const port = process.env.PORT || 3000; //si no especifico res, poso per defecte el port 3000


app.use(express.json()); //per convertir body a json
app.disable("x-powered-by");

// Per permetre peticions cross-origin (d'un altre servidor)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


async function startServidor() {
  try {
    //Em connecto a la base de dades
    const db = await connectDB();
    app.locals.db = db; // Guardo la db en `app.locals` per reutilitzar-la

    // Afegeixo les rutes
    app.get("/", (req, res) => {
      res.send("Benvingut/da a l'API. Utilitza /todos per accedir als TODOs.");
    });
    const router = crearRoutes(db);
    app.use("/todos", router);


    app.listen(port, () => {
      console.log(`Servidor en funcionament a http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Error en la connexió a la base de dades", error);
  }
}
startServidor();


