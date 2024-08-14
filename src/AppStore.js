import React, { useState ,useEffect} from 'react';
import Button from './components/Button';
import TextInput from './components/TextInput';
import Card from './components/Card';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import DataTable from './components/DataTable';
import Alert from './components/Alert';
import Loader from './components/Loader';
import Form from './components/Form';
import Accordion from './components/Accordion';
import Tooltip from './components/Tooltip';
import Pagination from './components/Pagination';
import Tabs from './components/Tabs';
import Breadcrumbs from './components/Breadcrumbs';
import Slider from './components/Slider';
import ProgressBar from './components/ProgressBar';
import MyDatePicker from './components/DatePicker';
import Rating from './components/Rating';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';
import { useSpring,animated,useSprings } from 'react-spring';
function Home() {
  return <h2>Accueil</h2>;
}

function Example() {
  const props = useSpring({
    to: { opacity: 1, transform: 'translateY(0%)' },
    from: { opacity: 0, transform: 'translateY(-100%)' },
    config: { tension: 280, friction: 60 }, // Configuration de l'animation
  });

  return <animated.div style={props}>Hello, World!</animated.div>;
}
function Example2() {
  const items = ['A', 'B', 'C'];
  const springs = useSprings(
    items.length,
    items.map((item, index) => ({
      opacity: 1,
      transform: 'translateY(0%)',
      from: { opacity: 0, transform: 'translateY(-100%)' },
      config: { tension: 280, friction: 60 },
      delay: index * 100,
    }))
  );

  return (
    <div>
      {springs.map((props, index) => (
        <animated.div key={index} style={props}>
          {items[index]}
        </animated.div>
      ))}
    </div>
  );
}
function Contact() {
  return <h2>Contact</h2>;
}



function fct(){

  return (
    <div className='animate__animated animate__pulse'>

<h1>Ma Collection de Cartes</h1>
<Card
  title="Carte 1"
  content="Voici le contenu de la première carte."
  footer="Pied de page de la première carte."
/>
<Card
  title="Carte 2"
  content="Voici le contenu de la deuxième carte."
/>

</div>

  );

}


function fct2(){
  <div className='animate__animated animate__pulse'>
{fct}
</div>

}


const articles = [
  // Imaginez une liste d'articles
  { id: 1, title: 'Article 1' },
  { id: 2, title: 'Article 2' },
  { id: 3, title: 'Article 3' },
  // Ajoutez autant d'articles que nécessaire
];
function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 1;
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const [progress, setProgress] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [inputValue, setInputValue] = useState('');
const props=useSpring({opacity:1,from:{opacity:0}});
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleRatingChange = (event) => {
    setUserRating(event.target.value);
    alert(`New rating: ${userRating}`);
  };
  const increaseProgress = () => {
    setProgress(prev => (prev < 100 ? prev + 10 : 100));
  };

  const decreaseProgress = () => {
    setProgress(prev => (prev > 0 ? prev - 10 : 0));
  };
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const currentArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  ); 
// eslint-disable-next-line react-hooks/rules-of-hooks
const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);


function About() {
  return (
    <div>

    <Button onClick={openModal}>Open Modal</Button>
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <DataTable headers={headers} data={data} />

    </Modal>
  </div>
  );
}
// eslint-disable-next-line react-hooks/rules-of-hooks
const [isLoading, setIsLoading] = useState(true);
  const handleClick = () => {
    alert('Button clicked!');
  };
  // eslint-disable-next-line no-undef
  useEffect(() => {
    // Simulate a loading process
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  const headers = ['Nom', 'Âge', 'Ville'];
  const data = [
    ['Alice', 24, 'Paris'],
    ['Bob', 27, 'Londres'],
    ['Charlie', 22, 'Berlin'],
    ['David', 29, 'Madrid'],
  ];

  const breadcrumbs = [
    { label: 'Accueil', href: '/' },
    { label: 'À propos', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
  const images = [
    'https://via.placeholder.com/800x400?text=Slide+1',
    'https://via.placeholder.com/800x400?text=Slide+2',
    'https://via.placeholder.com/800x400?text=Slide+3',
  ];

 

  return (
    
    <div>

<div >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<About />} />
        </Routes>
   
 
    </div>

    {Example()}
    {Example2()}

<div className='animate__animated animate__lightSpeedInRight' style={{ padding: '20px' }}>
      <h1>Progress Bar Example</h1>
      <ProgressBar progress={progress} />
      <div style={{ marginTop: '20px' }}>
        <button onClick={increaseProgress} style={{ marginRight: '10px', padding: '10px' }}>Increase</button>
        <button onClick={decreaseProgress} style={{ padding: '10px' }}>Decrease</button>
      </div>
    </div>



    <animated.div style={props}>
    <div onClick={fct}>
{    fct()
}    </div>
 </animated.div>
<div>

<Breadcrumbs paths={breadcrumbs} />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
</Routes>

</div>
         <h1>Mon Application</h1>
      <Accordion title="Section 1">
        <p>Contenu de la section 1</p>
      </Accordion>
      <Accordion title="Section 2">
        <p>Contenu de la section 2</p>
      </Accordion>
      <Accordion title="Section 3">
        <p>Contenu de la section 3</p>
      </Accordion>
    

      <div>
      <h1>Mon Application</h1>
      <Alert type="success" message="Opération réussie !" />
      <Alert type="error" message="Une erreur est survenue." />
      <Alert type="info" message="Ceci est une alerte d'information." />
   
   </div>
 
 

   <div>
      <h1>Mon Application</h1>
      <Button onClick={handleClick}>Cliquez-moi</Button>
    </div>

    <div>
      <h1>Exemple de DataTable</h1>
      <DataTable headers={headers} data={data} />
    </div>

    <div>
      
    <div>
      {isLoading ? <Loader /> : <Form />}
    </div>

      <h1>Date Picker Example</h1>
      <MyDatePicker />
    </div>




    <div style={{ padding: '20px' }}>
      <h1>Rating Component Example</h1>
      <Rating           value={inputValue}
 maxRating={5} initialRating={userRating} onChange={handleRatingChange} />
      <p>Your rating: {userRating}</p>
    </div>

    <div style={{ padding: '20px' }}>
      <h1>Image Slider Example</h1>
      <Slider images={images} />
    </div>
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>Text Input Example</h1>
      <form>
        <TextInput
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter your text here"
        />
        <div style={{ marginTop: '10px' }}>
          <strong>Current Value:</strong> {inputValue}
        </div>
      </form>
    </div>

    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Tooltip text="This is a tooltip">
        <button style={{ padding: '10px', fontSize: '16px' }}>Hover over me</button>
      </Tooltip>
    </div>
    <div>
      <h1>Articles</h1>
      <ul>
        {currentArticles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
    </div>

    
  );
}

export default App;
