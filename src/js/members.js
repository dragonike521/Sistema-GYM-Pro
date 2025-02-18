const db = require('./db');

module.exports = {
  // Obtener todos los miembros
  getMembers: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM members', [], (err, rows) => {
        if (err) {
          console.error('Error en la consulta:', err.message);
          reject({ success: false, message: 'Error en la base de datos' });
        } else {
          resolve(rows);
        }
      });
    });
  },

  // Agregar un nuevo miembro
  addMember: (member) => {
    return new Promise((resolve, reject) => {
      const { name, phone, email, membershipType, status, startDate, endDate } = member;
      db.run(
        'INSERT INTO members (name, phone, email, membershipType, status, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, phone, email, membershipType, status, startDate, endDate],
        function (err) {
          if (err) {
            console.error('Error al agregar miembro:', err.message);
            reject({ success: false, message: 'Error al agregar miembro' });
          } else {
            resolve({ success: true, id: this.lastID });
          }
        }
      );
    });
  },

  // Editar un miembro existente
  editMember: (id, member) => {
    return new Promise((resolve, reject) => {
      const { name, phone, email, membershipType, status, startDate, endDate } = member;
      db.run(
        'UPDATE members SET name = ?, phone = ?, email = ?, membershipType = ?, status = ?, startDate = ?, endDate = ? WHERE id = ?',
        [name, phone, email, membershipType, status, startDate, endDate, id],
        (err) => {
          if (err) {
            console.error('Error al editar miembro:', err.message);
            reject({ success: false, message: 'Error al editar miembro' });
          } else {
            resolve({ success: true });
          }
        }
      );
    });
  },

  // Eliminar un miembro
  deleteMember: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM members WHERE id = ?', [id], (err) => {
        if (err) {
          console.error('Error al eliminar miembro:', err.message);
          reject({ success: false, message: 'Error al eliminar miembro' });
        } else {
          resolve({ success: true });
        }
      });
    });
  },
};