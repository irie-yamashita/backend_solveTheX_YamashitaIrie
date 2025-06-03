import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import crearRoutesTodos from "./routes/todos";
import crearRoutesUsers from "./routes/users";

const app = express();
const port = process.env.PORT || 3000; //si no especifico res, poso per defecte el port 3000


app.use(express.json()); //per convertir body a json
app.disable("x-powered-by");

// Per permetre peticions cross-origin (d'un altre servidor)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


async function startServidor() {
  try {
    //Em connecto a la base de dades
    const db = await connectDB();
    app.locals.db = db; // Guardo la db en `app.locals` per reutilitzar-la

    // Afegeixo les rutes dels todos amb "/todos"
    app.get("/", (req, res) => { 
      res.send("Benvingut/da a l'API. Utilitza /todos per accedir als TODOs.");
    });
    const router = crearRoutesTodos(db);
    app.use("/todos", router);

  // Afegeix el router per als usuaris amb "/usuaris"
  const routerUsers = crearRoutesUsers(db);
  app.use("/usuaris", routerUsers);


    app.listen(port, () => {
      console.log(`Servidor en funcionament a http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Error en la connexió a la base de dades", error);
  }
}
startServidor();


