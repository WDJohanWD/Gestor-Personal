// main/db/db.js
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ruta de la base de datos (en la carpeta del usuario)
const dbPath = path.join(process.env.HOME || process.env.USERPROFILE, '.gestor-personal', 'data.db');

// Asegura que el directorio exista
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

// Inicializa la base de datos
const db = new Database(dbPath);

// Crea una tabla si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS transacciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL,
    categoria TEXT NOT NULL,
    monto REAL NOT NULL,
    descripcion TEXT,
    fecha TEXT NOT NULL
  )
`).run();

module.exports = db;
