import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Permet ús d'async/await amb SQLite
sqlite3.verbose();

export const connectDB = async () => {
    try {
        const db = await open({
            filename: "./db/database.sqlite",
            driver: sqlite3.Database,
        });

        // creo taula TODO's (si no existeix)
        await db.exec(`
            CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titol TEXT NOT NULL,
                descripcio TEXT,
                completat BOOLEAN DEFAULT 0,
                data_creacio DATETIME DEFAULT CURRENT_TIMESTAMP,
                prioritat TEXT CHECK(prioritat IN ('alta', 'mitjana', 'baixa'))
            );
        `);

        console.log("Base de dades connectada i taula creada!");

        return db;
    } catch (error) { //capturo error
        console.error("Error en connectar-se a la base de dades:", error);
        throw error;
    }
};
