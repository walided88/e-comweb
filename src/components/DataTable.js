import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
function DataTable({ headers, data }) {
  const [changColor, setChangColor] = useState('100%');
  const navigate = useNavigate(); // Initialisez useNavigate pour la navigation

  function setChang() {
    setChangColor('32%');
  }
 // Fonction pour gérer le clic sur une image
 const handleImageClick = (index) => {
  navigate(`/about/${index}`); // Redirige vers la page cible
};

  return (
    <table style={{ width: changColor, borderCollapse: 'collapse' }}>
      <thead >
        <tr >
          {headers.map((header, index) => (
            
            <th key={index} style={{ border: '7px solid #ddd', padding: '8px' }} onClick={setChang}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody >
        {data.map((item) => (
          
          <tr key={item._id}>
              <td 
              onClick={() => handleImageClick(item._id)} 
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')
              }
              key={item} style={{ border: '7px solid #ddd', padding: '8px' }} >{item.name}</td>
              <td key={item} style={{ border: '7px solid #ddd', padding: '8px' }}>{item.email}</td>
              <td key={item} style={{ border: '7px solid #ddd', padding: '8px' }}>{item.age}</td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
