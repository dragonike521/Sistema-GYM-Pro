const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../db/gym.db');
const db = new sqlite3.Database(dbPath);

module.exports = {
  // Obtener todos los visitantes
  getVisitors: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM visitors', [], (err, rows) => {
        if (err) {
          reject({ success: false, message: 'Error en la base de datos' });
        } else {
          resolve(rows);
        }
      });
    });
  },

  // Agregar un nuevo visitante
  addVisitor: (visitor) => {
    return new Promise((resolve, reject) => {
      const { name, phone, visitDate } = visitor;
      db.run(
        'INSERT INTO visitors (name, phone, visitDate) VALUES (?, ?, ?)',
        [name, phone, visitDate],
        function (err) {
          if (err) {
            reject({ success: false, message: 'Error al agregar visitante' });
          } else {
            resolve({ success: true, id: this.lastID });
          }
        }
      );
    });
  },

  // Eliminar un visitante
  deleteVisitor: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM visitors WHERE id = ?', [id], (err) => {
        if (err) {
          reject({ success: false, message: 'Error al eliminar visitante' });
        } else {
          resolve({ success: true });
        }
      });
    });
  },
};