import React from 'react';

const UserDashboard = () => {
  const orders = [
    { id: 1, date: '2024-07-01', total: 79.99, status: 'Livré' },
    { id: 2, date: '2024-07-10', total: 45.00, status: 'En cours' },
    // Liste des commandes
  ];

  return (
    <div className="user-dashboard">
      <h1>Tableau de Bord</h1>

      {/* Historique des commandes */}
      <section className="order-history">
        <h2>Historique des commandes</h2>
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              Commande #{order.id} - {order.date} - {order.total}€ - {order.status}
            </li>
          ))}
        </ul>
      </section>

      {/* Informations personnelles */}
      <section className="personal-info">
        <h2>Informations personnelles</h2>
        <p>Nom : John Doe</p>
        <p>Email : john.doe@example.com</p>
        {/* Autres informations personnelles */}
      </section>
    </div>
  );
};

export default UserDashboard;
