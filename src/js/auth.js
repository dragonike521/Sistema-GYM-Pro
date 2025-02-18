const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../db/gym.db');
const db = new sqlite3.Database(dbPath);

module.exports = {
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
          reject({ success: false, message: 'Error en la base de datos' });
        } else if (row) {
          resolve({ success: true, user: row });
        } else {
          resolve({ success: false, message: 'Credenciales incorrectas' });
        }
      });
    });
  },
};