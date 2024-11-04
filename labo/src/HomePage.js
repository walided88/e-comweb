import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importez les styles

import Homepage2 from './HomePage2';
import './styles.css';
import SearchProduct from './components/SearchProduct';
import { useMediaQuery } from 'react-responsive'; // Importer le hook


const HomePage = () => {

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
