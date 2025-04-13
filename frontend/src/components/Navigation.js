import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShieldAlt, FaBars, FaTimes, FaGithub } from 'react-icons/fa';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <NavContainer>
      <NavContent>
        <LogoContainer>
          <FaShieldAlt size={28} color="#fff" />
          <LogoText>Z3maSafe</LogoText>
        </LogoContainer>

        <MenuButton onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </MenuButton>

        <NavLinks isOpen={isMenuOpen}>
          <NavLink href="#" active>Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#docs">Documentation</NavLink>
          <NavLink 
            href="https://github.com/yourusername/z3masafe" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub style={{ marginRight: '8px' }} />
            GitHub
          </NavLink>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  background: linear-gradient(135deg, #6c63ff 0%, #4834d4 100%);
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoText = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    position: absolute;
    flex-direction: column;
    background: linear-gradient(135deg, #6c63ff 0%, #4834d4 100%);
    top: 100%;
    left: 0;
    right: 0;
    padding: 1rem 2rem;
    gap: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: ${({ isOpen }) => isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${({ isOpen }) => isOpen ? 1 : 0};
    visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease-in-out;
    z-index: -1;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: ${({ active }) => active ? '600' : '400'};
  padding: 0.5rem 0;
  position: relative;
  display: flex;
  align-items: center;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 2px;
    background-color: white;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

export default Navigation;