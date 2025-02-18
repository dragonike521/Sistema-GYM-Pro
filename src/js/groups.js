const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../db/gym.db');
const db = new sqlite3.Database(dbPath);

module.exports = {
  // Obtener todos los grupos
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

  // Agregar un nuevo grupo
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

  // Editar un grupo existente
  editGroup: (id, group) => {
    return new Promise((resolve, reject) => {
      const { name, responsible, membersCount } = group;
      db.run(
        'UPDATE groups SET name = ?, responsible = ?, membersCount = ? WHERE id = ?',
        [name, responsible, membersCount, id],
        (err) => {
          if (err) {
            reject({ success: false, message: 'Error al editar grupo' });
          } else {
            resolve({ success: true });
          }
        }
      );
    });
  },

  // Eliminar un grupo
  deleteGroup: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM groups WHERE id = ?', [id], (err) => {
        if (err) {
          reject({ success: false, message: 'Error al eliminar grupo' });
        } else {
          resolve({ success: true });
        }
      });
    });
  },
};