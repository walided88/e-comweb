import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instanceClients,instanceUsers } from '../axios';
import styled from 'styled-components';

function DataTable({ headers, data }) {
  const [changColor, setChangColor] = useState('100%');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  function setChang() {
    setChangColor('32%');
  }
  const handleImageClick = async (clientId, commandeId, prodId) => {
    try {
      console.log(`Client ID: ${clientId}, Commande ID: ${commandeId}, Produit ID: ${prodId}`);
      const response = await instanceClients.put(`/${clientId}/${commandeId}/${prodId}`, {});
      console.log('Produit mis à jour:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
    }
  };
  


  return (
    <table style={{ width: changColor, borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} style={{ border: '7px solid #ddd', padding: '8px' }} onClick={setChang}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td 
              key={item.name} style={{ border: '7px solid #ddd', padding: '8px' }}>{item.name}</td>
            <td key={item.email} style={{ border: '7px solid #ddd', padding: '8px' }}>{item.email}</td>
            <td key={item.num} style={{ border: '7px solid #ddd', padding: '8px' }}>{item.num}</td>
            <td key={item.adresse} style={{ border: '7px solid #ddd', padding: '8px' }}>{item.adresse}</td>
            <td key={item.ville} style={{ border: '7px solid #ddd', padding: '8px' }}>{item.ville}</td>
            <td key={item.commandes} style={{ border: '7px solid #ddd', padding: '30px' }}>
              <div>
                {item.commandes.map((commande, index) => (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    <ul>
                      {commande.prods.map((prod, idx) => (
                        <li key={idx}>
                          <p>Date: {new Date(commande.date).toLocaleString()}</p>
                          <p>_______________________________________________</p>
                          <p><strong>Nom du produit:</strong> {prod.name}</p>
                          <p><strong>Prix:</strong> ${prod.price}</p>
                          <p><strong>Quantité:</strong> {prod.quantity}</p>
                          <img src={prod.image} alt={prod.name} style={{ width: '100px', height: '100px' }} />
                          {!prod.selled && (
                            <button 
                              onClick={() => handleImageClick(item._id, commande._id,prod._id)}>
                              Mark as Sold
                            </button>
                          )}
                          {prod.selled ? 'Already selled' : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
