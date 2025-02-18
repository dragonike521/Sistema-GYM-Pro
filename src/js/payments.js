const db = require('./db');

module.exports = {
  // Obtener todos los pagos
  getPayments: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM payments', [], (err, rows) => {
        if (err) {
          console.error('Error en la consulta:', err.message);
          reject({ success: false, message: 'Error en la base de datos' });
        } else {
          resolve(rows);
        }
      });
    });
  },

  // Agregar un nuevo pago
  addPayment: (payment) => {
    return new Promise((resolve, reject) => {
      const { memberId, amount, paymentDate } = payment;
      db.run(
        'INSERT INTO payments (memberId, amount, paymentDate) VALUES (?, ?, ?)',
        [memberId, amount, paymentDate],
        function (err) {
          if (err) {
            console.error('Error al agregar pago:', err.message);
            reject({ success: false, message: 'Error al agregar pago' });
          } else {
            resolve({ success: true, id: this.lastID });
          }
        }
      );
    });
  },

  // Eliminar un pago
  deletePayment: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM payments WHERE id = ?', [id], (err) => {
        if (err) {
          console.error('Error al eliminar pago:', err.message);
          reject({ success: false, message: 'Error al eliminar pago' });
        } else {
          resolve({ success: true });
        }
      });
    });
  },
};