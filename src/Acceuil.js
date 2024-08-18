import React from 'react';
import './styles.css';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import SearchProduct from './components/SearchProduct';
import ProductItem from './components/ProductItem';
import { updateProducts, prodSelected, setIndex,setCurrentAdds } from './reducers/userReducer';
import { useSelector, useDispatch, } from 'react-redux';
import { useMediaQuery } from 'react-responsive'; // Importer le hook

const Accueil = () => {
    const navigate = useNavigate();
    const list = useSelector((state) => state.user.productList);
    const dispatch = useDispatch();
    const prodSelecteds = useSelector((state) => state.user.productNumber);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const handleImageClick = (index) => {
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
 dispatch(prodSelected(prodSelecteds + 1));    };
    const headers = [list];
    const handleButtonClick = (index) => {
        // Logique du bouton lors du clic
        navigate(`/about/${index}`+"buy"); // Redirige vers la page cible
    };
console.log(list,'ckckckckcck');
    const handleButtonPanel = (index) => {
        // Logique du bouton lors du clic
        navigate(`/about/${index}`+"panel"); // Redirige vers la page cible
    };
  return (
    
    <div >
      {/* Barre de recherche */}

      <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '27vh'
            }
            }>
    {!isMobile && (
   <SearchProduct />) }

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
                    {list.map((src, index) => (
                        <div  key={index}>
                            <img  src={src.image} alt={`header-${index}`} style={{ cursor: 'pointer',width: '30%', height: '50%'}} />
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

      <div class="cadre">
  <div class="contenu">
  <div className="products-list" >
      {list.map((src, index) => (
        <ProductItem
          key={index}
          src={src.image}
          altText={`Product ${index + 1}`}
          productName={`Product ${index + 1}`}
          methode={() => handleImageClick(index)} // Correctly pass the function

        />
      ))}

    </div> 
     </div>
</div>


  </section>

    </div>
  );
};

export default Accueil;
