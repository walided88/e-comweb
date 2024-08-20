import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importez les styles
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage2 from './HomePage2';
import './styles.css';
import SearchProduct from './components/SearchProduct';
import { useMediaQuery } from 'react-responsive'; // Importer le hook
import Chat from './Chat';


const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });



    return (
        <div>
           <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '30vh'
              
            }
            }>
              
     {!isMobile && (
   <SearchProduct />) }
      </div>
 
                        <Homepage2 />

        </div>
    );
};

export default HomePage;
