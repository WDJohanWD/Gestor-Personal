const { ipcMain } = require('electron');
const db = require('./db/db');

ipcMain.handle('add-transaccion', (event, transaccion) => {
  console.log('Transacción recibida en main:', transaccion); // Agregado para ver si llega
  try {
    const stmt = db.prepare(`
      INSERT INTO transacciones (tipo, categoria, monto, descripcion, fecha)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      transaccion.tipo,
      transaccion.categoria,
      transaccion.monto,
      transaccion.descripcion || '',
      transaccion.fecha
    );
    console.log('Insertado con ID:', info.lastInsertRowid); // Agregado
    return info.lastInsertRowid; // Esto es lo que deberías ver en el front
  } catch (error) {
    console.error('Error al insertar transacción:', error);
    return null;
  }
});
