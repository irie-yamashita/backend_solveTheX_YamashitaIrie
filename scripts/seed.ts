
/*Fitxer per fer inserts inicials (proves)*/

import { connectDB } from "../src/db";
import bcrypt from "bcrypt"; //per encriptar contrasenyes

async function seed() {
  try {
    // Em connecto a la base de dades
    const db = await connectDB();
    

    // Faig inserts
    await db.run(`INSERT INTO todos (titol, descripcio, completat, prioritat)
    VALUES ("Repte web", "Entregar repte web Solve The X", 1, "alta")`);

    await db.run(`INSERT INTO todos (titol, descripcio, completat, prioritat)
    VALUES ("Comprar pa", "Anar al forn de pa i comparar una barra.", 1, "baixa")`);

    await db.run(`INSERT INTO todos (titol, descripcio, completat, prioritat)
    VALUES ("Entrenar futbol sala", "Sessió d'entrenament de futbol sala amb l'equip", 1, "mitjana")`);

    await db.run(`INSERT INTO todos (titol, descripcio, completat, prioritat)
    VALUES ("Classes", "Preparar següent classe de matemàtiques", 0, "mitjana")`);

    await db.run(`INSERT INTO todos (titol, descripcio, completat, prioritat)
    VALUES ("Trucar a l'àvia", "Fer una trucada ràpida per veure com està", 0, "alta")`);

    await db.run(`INSERT INTO todos (titol, descripcio, completat, prioritat)
    VALUES ("Fer còpia de seguretat", "Guardar tots els arxius importants en un disc extern", 0, "mitjana")`);

    await db.run(`INSERT INTO todos (titol, descripcio, completat, prioritat)
    VALUES ("Sopar classe", "Trobar restaurant per sopar amb la classe", 0, "baixa")`);


    const contra1 = await bcrypt.hash("2004", 5);  
    const contra2 = await bcrypt.hash("agora307", 5);
    const contra3 = await bcrypt.hash("reto", 5);

    await db.run(`INSERT INTO users (username, password) VALUES ("irie", "${contra1}")`);
    await db.run(`INSERT INTO users (username, password) VALUES ("itb", "${contra2}")`);
    await db.run(`INSERT INTO users (username, password) VALUES ("solveTheX", "${contra3}")`);


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
