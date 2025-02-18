const db = require('./db');

module.exports = {
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
          console.error('Error en la consulta:', err.message);
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