import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Composant pour le bouton hamburger avec positionnement et z-index
const MenuButton = styled.div`
  width: 30px;
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  position: absolute; /* Positionné en absolu */
  top: 20px;
  right: 20px;
  z-index: 1000; /* Met le bouton hamburger au-dessus des autres éléments */

  div {
    width: 100%;
    height: 4px;
    background-color: grey;
  }
`;

// Composant pour le menu déroulant avec z-index
const DropdownMenu = styled.div`
  position: absolute;
  top: 56px;
  right: 10px;
  width: 150px;
  background-color: rgba(147, 147, 147, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 999; /* Assurez que le menu est au-dessus des autres éléments */

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const MenuLink = styled.div`
  padding: 8px;
  text-decoration: none;
  color: #333;
  transition: color 0.2s ease, transform 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #007BFF;
    transform: scale(1.1);
  }
`;

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (index) => {
    navigate(`/about/${index}`);
  };

  // Ferme le menu lorsque l'on clique en dehors du menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <MenuButton onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </MenuButton>

      <DropdownMenu ref={menuRef} isOpen={isOpen}>
        <ul>
          <li><MenuLink onClick={() => handleClick(1)}>Option 1</MenuLink></li>
          <li><MenuLink onClick={() => handleClick(2)}>Option 2</MenuLink></li>
          <li><MenuLink onClick={() => handleClick(3)}>Option 3</MenuLink></li>
          <li><MenuLink onClick={() => handleClick(4)}>Option 4</MenuLink></li>
        </ul>
      </DropdownMenu>
    </div>
  );
};

export default HamburgerMenu;
