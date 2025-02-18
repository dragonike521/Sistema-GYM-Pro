const db = require('./db');

module.exports = {
  getGroups: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM groups', [], (err, rows) => {
        if (err) {
          reject({ success: false, message: 'Error en la base de datos' });
        } else {
          resolve(rows);
        }
      });
    });
  },

  addGroup: (group) => {
    return new Promise((resolve, reject) => {
      const { name, responsible, membersCount } = group;
      db.run(
        'INSERT INTO groups (name, responsible, membersCount) VALUES (?, ?, ?)',
        [name, responsible, membersCount],
        function (err) {
          if (err) {
            reject({ success: false, message: 'Error al agregar grupo' });
          } else {
            resolve({ success: true, id: this.lastID });
          }
        }
      );
    });
  },
};