import Navbar from './components/Navbar'; // Assurez-vous d'importer le composant Navbar
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // Initialisez useNavigate pour la navigation
    const [hoveredIndex, setHoveredIndex] = useState(null);
    
    
    
    const handleMouseOver = (index) => {
        setHoveredIndex(index);
    };


    const handleMouseOut = () => {
        setHoveredIndex(null);
    };



    const headers = [
        require('./images/11.png'),
        require('./images/22.png'),
        require('./images/33.png'),
        require('./images/44.png'),
        require('./images/55.png'),
        require('./images/66.png'),
        require('./images/77.png'),
        require('./images/11.png'),
        require('./images/22.png'),
        require('./images/33.png'),
        require('./images/44.png'),
        require('./images/55.png'),

    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // J'ai corrigé la valeur du délai à 2000 millisecondes (2 secondes)

        return () => clearTimeout(timer);
    }, []);

    // Fonction pour gérer le clic sur une image
    const handleImageClick = (index) => {
        navigate(`/about/${index}`); // Redirige vers la page cible
    };
    // Fonction pour gérer le clic sur une image


    const handleButtonClick = (index) => {
        // Logique du bouton lors du clic
        navigate(`/about/${index}`+"buy"); // Redirige vers la page cible
    };

    const handleButtonPanel = (index) => {
        // Logique du bouton lors du clic
        navigate(`/about/${index}`+"panel"); // Redirige vers la page cible
    };
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {headers.map((src, index) => (
                <div 
                    key={index} 
                    style={{ position: 'relative', margin: '5px' }}
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={handleMouseOut}
                >
                    <img
                        src={src}
                        alt={`header-${index}`}
                        style={{ 
                            width: '200px', 
                            cursor: 'pointer', 
                            transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                            transition: 'transform 0.3s ease'
                        }}
                        onClick={() => handleImageClick(index)}
                    />
                    {hoveredIndex === index && (
                        <div style={{
                            position: 'absolute',
                            top: '90%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            gap: '10px'
                        }}>
                            <button
                                onClick={() =>  handleButtonPanel(index)}
                                style={{
                                    padding: '1px 1px',
                                    backgroundColor: 'rgba(111, 0, 0, 0.7)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    width: '50px',
                                    height: '20px',
                                    fontSize: '10px',
                                }}
                            >
                                Panier
                            </button>
                            <button
                                onClick={() => handleButtonClick(index)}
                                style={{
                                    padding: '1px 1px',
                                    backgroundColor: 'rgba(0, 110, 0, 0.7)',
                                    color: 'white',
                                    border: 'none',
                                    width: '50px',
                                    height: '20px',
                                    fontSize: '10px',

                                    cursor: 'pointer'
                                }}
                            >
                                Acheter
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default HomePage;