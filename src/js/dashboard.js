const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../db/gym.db');
const db = new sqlite3.Database(dbPath);

module.exports = {
  getDashboardData: () => {
    return new Promise((resolve, reject) => {
      const today = new Date();
      db.all('SELECT * FROM members', [], (err, rows) => {
        if (err) {
          reject({ success: false, message: 'Error en la base de datos' });
        } else {
          const activeMembers = rows.filter(row => row.status === 'active').length;
          const expiredMemberships = rows.filter(row => new Date(row.endDate) < today).length;
          const upcomingExpirations = rows.filter(row => {
            const endDate = new Date(row.endDate);
            return endDate > today && endDate < new Date(today.setDate(today.getDate() + 7));
          }).length;

          resolve({
            activeMembers,
            expiredMemberships,
            upcomingExpirations,
          });
        }
      });
    });
  },
};