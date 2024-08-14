import React from 'react';
import './styles.css';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import SearchProduct from './components/SearchProduct';
import ProductItem from './components/ProductItem';

const Accueil = () => {
    const navigate = useNavigate();

    const handleImageClick = (index) => {
        navigate(`/about/${index}`);
    };
    const headers = [
        require('./images/11.png'),
        require('./images/22.png'),
        require('./images/33.png'),
        require('./images/44.png'),
        require('./images/55.png'),
        require('./images/66.png'),
        require('./images/77.png'),
        require('./images/88.png'),
    ];
    const handleButtonClick = (index) => {
        // Logique du bouton lors du clic
        navigate(`/about/${index}`+"buy"); // Redirige vers la page cible
    };

    const handleButtonPanel = (index) => {
        // Logique du bouton lors du clic
        navigate(`/about/${index}`+"panel"); // Redirige vers la page cible
    };
  return (
    
    <div className="homepage">
      {/* Barre de recherche */}

      <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '25vh'
            }
            }>
      <SearchProduct />

      </div>
      {/* <div className="banner">
        <img 
          src="https://via.placeholder.com/1500x500" 
          alt="Banner" 
          className="banner-image" 
        />
      </div> */}
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
      {/* Catégories de produits */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="categories-list">
          <div className="category-item">Electronics</div>
          <div className="category-item">Fashion</div>
          <div className="category-item">Home & Kitchen</div>
          <div className="category-item">Beauty & Health</div>
          <div className="category-item">Sports</div>
          <div className="category-item">Toys</div>
        </div>
      </section>

      {/* Produits populaires */}
      <section>
    <h2>Popular Products</h2>
    <div className="products-list" style={{ display: 'flex' }}>
      {headers.map((src, index) => (
        <ProductItem
          key={index}
          src={src}
          altText={`Product ${index + 1}`}
          productName={`Product ${index + 1}`}
        />
      ))}

    </div>
  </section>

    </div>
  );
};

export default Accueil;
