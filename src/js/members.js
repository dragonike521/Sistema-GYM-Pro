const db = require('./db');

module.exports = {
  getMembers: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM members', [], (err, rows) => {
        if (err) {
          reject({ success: false, message: 'Error en la base de datos' });
        } else {
          resolve(rows);
        }
      });
    });
  },

  addMember: (member) => {
    return new Promise((resolve, reject) => {
      const { name, phone, email, membershipType, status, startDate, endDate } = member;
      db.run(
        'INSERT INTO members (name, phone, email, membershipType, status, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, phone, email, membershipType, status, startDate, endDate],
        function (err) {
          if (err) {
            reject({ success: false, message: 'Error al agregar miembro' });
          } else {
            resolve({ success: true, id: this.lastID });
          }
        }
      );
    });
  },

  deleteMember: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM members WHERE id = ?', [id], (err) => {
        if (err) {
          reject({ success: false, message: 'Error al eliminar miembro' });
        } else {
          resolve({ success: true });
        }
      });
    });
  },
};