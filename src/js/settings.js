const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta a la base de datos
const dbPath = path.join(__dirname, '../db/gym.db');
const db = new sqlite3.Database(dbPath);

module.exports = {
  // Obtener la configuración actual
  getSettings: () => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM settings WHERE id = 1', [], (err, row) => {
        if (err) {
          reject({ success: false, message: 'Error al obtener la configuración' });
        } else {
          resolve(row || {
            currency: 'USD',
            dateFormat: 'DD/MM/YYYY',
            membershipDuration: 1,
          });
        }
      });
    });
  },

  // Guardar la configuración
  saveSettings: (settings) => {
    return new Promise((resolve, reject) => {
      const { currency, dateFormat, membershipDuration } = settings;
      db.run(
        'INSERT OR REPLACE INTO settings (id, currency, dateFormat, membershipDuration) VALUES (1, ?, ?, ?)',
        [currency, dateFormat, membershipDuration],
        (err) => {
          if (err) {
            reject({ success: false, message: 'Error al guardar la configuración' });
          } else {
            resolve({ success: true });
          }
        }
      );
    });
  },
};