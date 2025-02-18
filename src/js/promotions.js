const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../db/gym.db');
const db = new sqlite3.Database(dbPath);

module.exports = {
  // Obtener todas las promociones
  getPromotions: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM promotions', [], (err, rows) => {
        if (err) {
          reject({ success: false, message: 'Error en la base de datos' });
        } else {
          resolve(rows);
        }
      });
    });
  },

  // Agregar una nueva promoción
  addPromotion: (promotion) => {
    return new Promise((resolve, reject) => {
      const { name, discount, validUntil } = promotion;
      db.run(
        'INSERT INTO promotions (name, discount, validUntil) VALUES (?, ?, ?)',
        [name, discount, validUntil],
        function (err) {
          if (err) {
            reject({ success: false, message: 'Error al agregar promoción' });
          } else {
            resolve({ success: true, id: this.lastID });
          }
        }
      );
    });
  },

  // Eliminar una promoción
  deletePromotion: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM promotions WHERE id = ?', [id], (err) => {
        if (err) {
          reject({ success: false, message: 'Error al eliminar promoción' });
        } else {
          resolve({ success: true });
        }
      });
    });
  },
};