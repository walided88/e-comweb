import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importez les styles
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage2 from './HomePage2';
import './styles.css';
import SearchProduct from './components/SearchProduct';


const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // const headers = [
    //     require('./images/11.png'),
    //     require('./images/22.png'),
    //     require('./images/33.png'),
    //     require('./images/44.png'),
    //     require('./images/55.png'),
    //     require('./images/66.png'),
    //     require('./images/77.png'),
    //     require('./images/88.png'),
    // ];

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsLoading(false);
    //     }, 20);

    //     return () => clearTimeout(timer);
    // }, []);

    // const handleImageClick = (index) => {
    //     navigate(`/about/${index}`);
    // };

    return (
        <div>
           <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '30vh'
              
            }
            }>
      <SearchProduct />

      </div>
            {/* {isLoading ? (
                <div className="banner" style={{ marginTop: '20px', top: '200px', left: "200px" }}>
                    loading...
                </div>
            ) : (
                <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                onClickItem={handleImageClick}
                dynamicHeight={true}
                showStatus={false}
                interval={5000} // Durée pendant laquelle chaque diapositive est affichée (en millisecondes)
                transitionTime={2000} // Durée de la transition entre les diapositives (en millisecondes)
            >
                    {headers.map((src, index) => (
                        <div  key={index}>
                            <img  src={src} alt={`header-${index}`} style={{ cursor: 'pointer',width: '30%', height: '50%'}} />
                        </div>
                    ))}
                </Carousel>
            )} */}
                        <Homepage2 />

        </div>
    );
};

export default HomePage;
