const db = require('./db');

module.exports = {
  getDashboardData: () => {
    return new Promise((resolve, reject) => {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      // Consulta para obtener todos los miembros
      db.all('SELECT * FROM members', [], (err, rows) => {
        if (err) {
          console.error('Error en la consulta de miembros:', err.message);
          reject({ success: false, message: 'Error en la base de datos' });
          return;
        }

        // Filtrar datos para el dashboard
        const activeMembers = rows.filter(row => row.status === 'active').length;
        const expiredMemberships = rows.filter(row => new Date(row.endDate) < today).length;
        const upcomingExpirations = rows.filter(row => {
          const endDate = new Date(row.endDate);
          return endDate > today && endDate < new Date(today.setDate(today.getDate() + 7));
        }).length;

        // Consulta para obtener nuevos miembros este mes
        db.all(
          'SELECT * FROM members WHERE startDate BETWEEN ? AND ?',
          [startOfMonth.toISOString().split('T')[0], endOfMonth.toISOString().split('T')[0]],
          (err, newMembers) => {
            if (err) {
              console.error('Error en la consulta de nuevos miembros:', err.message);
              reject({ success: false, message: 'Error en la base de datos' });
              return;
            }

            resolve({
              activeMembers,
              expiredMemberships,
              upcomingExpirations,
              newMembersThisMonth: newMembers.length,
            });
          }
        );
      });
    });
  },
};