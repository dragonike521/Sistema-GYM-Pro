const db = require('./db');

module.exports = {
  getPayments: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM payments', [], (err, rows) => {
        if (err) {
          reject({ success: false, message: 'Error en la base de datos' });
        } else {
          resolve(rows);
        }
      });
    });
  },

  addPayment: (payment) => {
    return new Promise((resolve, reject) => {
      const { memberId, amount, paymentDate } = payment;
      db.run(
        'INSERT INTO payments (memberId, amount, paymentDate) VALUES (?, ?, ?)',
        [memberId, amount, paymentDate],
        function (err) {
          if (err) {
            reject({ success: false, message: 'Error al agregar pago' });
          } else {
            resolve({ success: true, id: this.lastID });
          }
        }
      );
    });
  },
};