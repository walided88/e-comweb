import React, { useEffect, useRef, useState } from 'react';

const messages = [
  "Veuillez patienter",
  "Temps d'attente estimé : 1 min",
  "Merci de votre patience",
];

const Loader = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const opacity = useRef(1); // Valeur d'opacité initiale
  const opacityAnim = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Animation de disparition
      if (opacityAnim.current) {
        opacityAnim.current.style.opacity = 0;
      }
      setTimeout(() => {
        // Changer le message après l'animation
        setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
        if (opacityAnim.current) {
          opacityAnim.current.style.opacity = 1; // Réapparition
        }
      }, 500); // Durée de la disparition

    }, 5000); // Intervalle de 5 secondes

    return () => clearInterval(intervalId); // Nettoyage lors de la destruction du composant
  }, []);

  return (
    <div style={styles.loadingContainer}>
      <div style={styles.messageContainer}>
        <div ref={opacityAnim} style={{ ...styles.loadingMessage, opacity: opacity.current }}>
          {messages[currentMessageIndex]}
        </div>
      </div>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  loadingContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  messageContainer: {
    position: 'absolute',
    top: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#25D366', // Définissez la couleur que vous souhaitez ici

  },
  loadingMessage: {
    marginBottom: 10,
    textAlign: 'center',
    transition: 'opacity 0.5s ease', // Ajoute la transition pour l'opacité
  },
  spinner: {
    width: 40,
    height: 40,
    border: '4px solid #f3f3f3',
    borderRadius: '50%',
    position: 'absolute', // Position absolue pour un placement spécifique
    bottom: '-90px', // Positionnement à 20px du bas
    borderTop: '4px solid #25D366',
    animation: 'spin 1s linear infinite',
  },
};

// Styles CSS pour l'animation de rotation du spinner
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default Loader;
