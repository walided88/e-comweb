import React, { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './components/Navbar';
import HomePage from './HomePage';
import Footer from './components/Footer';
import ClientForm from './components/ClientForm';
import Acceuil  from './Acceuil';
import ListProd from './components/ListProd';
import CartPage from './components/CartPage';
import UserSettings from './components/UserSettings';
import AuthForm from './components/AutForm';




// export const SocketContext = createContext(null);






function App() {

  return (
    <div style={{ background:" #ffffff"}}>
            <Navbar />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<Home />} />
      <Route path="/users/list" element={<ListProd />} />
      <Route path="/users/cartPage" element={<CartPage />} />
      <Route path="/users/UserSettings" element={<UserSettings />} />
      <Route path="/users/authForm" element={<AuthForm/>} />

      <Route path="/users/acceuil" element={<Acceuil />} />
      <Route path="/users/clientForm" element={<ClientForm/>} />

    </Routes>


    <Footer />

    </div>

  );
}

export default App;
