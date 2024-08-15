/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import { useSelector, useDispatch } from 'react-redux';
import { updateProducts, prodSelected, setIndex,setCurrentAdds } from './reducers/userReducer';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // Initialisez useNavigate pour la navigation
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const prodSelecteds = useSelector((state) => state.user.productNumber);
    const currentIndex = useSelector((state) => state.user.index);
    const [adds, setAdds] = useState(0);
    const list = useSelector((state) => state.user.productList);
    const CurrentAddss = useSelector((state) => state.user.currentAdds);


    const dispatch = useDispatch();

    const handleMouseOver = (index) => {
        setHoveredIndex(index);
    };


    const handleMouseOut = () => {
        setHoveredIndex(null);
    };



    const [headers, setHeaders] = useState([
    { id: 1, name: 'Product 1', price: 1.99, image: require("./images/11.png"), quantity: 1 },
    { id: 2, name: 'Product 2', price: 2.99, image: require("./images/22.png"), quantity: 2 },
    { id: 3, name: 'Product 3', price: 3.99, image: require("./images/33.png"), quantity: 1 },
    { id: 4, name: 'Product 4', price: 4.99, image: require("./images/44.png"), quantity: 2 },
    { id: 5, name: 'Product 5', price: 5.99, image: require("./images/55.png"), quantity: 1 },
    { id: 6, name: 'Product 6', price: 6.99, image: require("./images/66.png"), quantity: 2 },
    { id: 7, name: 'Product 7', price: 7.99, image: require("./images/77.png"), quantity: 1 },
    { id: 8, name: 'Product 8', price: 8.99, image: require("./images/88.png"), quantity: 2 },
   
]);

// for (let header of headers) {
//     dispatch(addProducts(header));
//   }

// const currentProd = useSelector(state => state.user.productList.find(prod => prod.id === currentIndex));

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
        // Redirige vers la page cible
        navigate(`/users/cartPage`);
    
        // Récupère le produit actuel dans la liste
        const currentProduct = list[index];
        
        // Vérifie si la quantité existe déjà, sinon l'initialise à 0
        const currentQuantity = currentProduct.quantity || 0;
        
        // Incrémente la quantité
        const newQuantity = currentQuantity + 1;
        
        // Crée un nouvel objet produit avec la quantité mise à jour
        const updatedProduct = {
            ...currentProduct,
            quantity: newQuantity
        };
        
        // Dispatch l'action pour mettre à jour le produit dans Redux
        dispatch(updateProducts(updatedProduct));
        
        // Déclenche l'action pour suivre le nombre de produits sélectionnés
        dispatch(prodSelected(prodSelecteds + 1));
    };
    
    const handleButtonPanel = (index) => {
        const currentProduct = list[index];
    
        // Si l'élément existe, mettez à jour sa quantité
        const newQuantity = (currentProduct.quantity || 0) + 1;
    
        // Créez un nouvel objet produit avec la quantité mise à jour
        const updatedProduct = {
            ...currentProduct,
            quantity: newQuantity
        };
    
        // Dispatch l'action pour mettre à jour le produit dans Redux
        dispatch(updateProducts(updatedProduct));
    
        // Déclenche l'action pour suivre le nombre de produits sélectionnés
        dispatch(prodSelected(prodSelecteds + 1));
    };
    
    
    
    // console.log(CurrentAddss,'1111');
    // console.log(list,'lllllllllllllll');

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
                        src={src.image}
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