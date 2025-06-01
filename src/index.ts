import express from "express";

const app = express();
const port = process.env.PORT || 3000; //si no especifico res, per defecte poso el port 3000

app.get("/", (req, res) => {
  res.send("He arribat!");
});

app.listen(port, () => {
  console.log(`Servidor en funcionament a http://localhost:${port}`);
});
