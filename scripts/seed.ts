
/*Fitxer per fer inserts inicials (proves)*/

import { connectDB } from "../src/db";

async function seed() {
  try {
    // Em connecto a la base de dades
    const db = await connectDB();

    // Faig inserts
    await db.run(`INSERT INTO todos (titol, descripcio, completat, prioritat)
        VALUES ("Comprar pa", "Anar al forn de pa i comparar una barra de pa.", 0, "alta")`);

    await db.run(`INSERT INTO todos (titol, descripcio, completat, prioritat)
        VALUES ("Entrenar futbol sala", "Sessió d'entrenament de futbol sala amb l'equip", 0, "mitjana")`);

    console.log("Inserts fets correctament!");
    
    // Tanco la connexió a la db i procés
    await db.close();
    process.exit(0);

  } catch (error) {
    console.error("Error al fer els inserts:", error);
    process.exit(1);
  }
}

//crido funció
seed();
