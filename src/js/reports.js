const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../db/gym.db');
const db = new sqlite3.Database(dbPath);

module.exports = {
  // Obtener reporte financiero
  getFinancialReport: (month, year) => {
    return new Promise((resolve, reject) => {
      const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
      const endDate = `${year}-${String(month).padStart(2, '0')}-31`;

      db.all(
        'SELECT * FROM payments WHERE paymentDate BETWEEN ? AND ?',
        [startDate, endDate],
        (err, rows) => {
          if (err) {
            reject({ success: false, message: 'Error en la base de datos' });
          } else {
            resolve(rows);
          }
        }
      );
    });
  },
};