import React from 'react';
import styled from 'styled-components';
import { FaShieldAlt, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo>
            <FaShieldAlt size={24} />
            <h3>Z3maSafe</h3>
          </FooterLogo>
          <p>Static .exe analyzer for detecting suspicious behavior</p>
          <p>Files are analyzed locally and never uploaded to external servers</p>
        </FooterSection>
        
        <FooterSection>
          <h4>Quick Links</h4>
          <FooterLinks>
            <FooterLink href="#about">About</FooterLink>
            <FooterLink href="#docs">Documentation</FooterLink>
            <FooterLink href="#privacy">Privacy Policy</FooterLink>
            <FooterLink href="#terms">Terms of Use</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <h4>Connect</h4>
          <SocialLinks>
            <SocialLink href="https://github.com/yourusername/z3masafe" target="_blank" rel="noopener noreferrer">
              <FaGithub size={20} />
              <span>GitHub</span>
            </SocialLink>
            <SocialLink href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={20} />
              <span>Twitter</span>
            </SocialLink>
            <SocialLink href="mailto:contact@example.com">
              <FaEnvelope size={20} />
              <span>Email</span>
            </SocialLink>
          </SocialLinks>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; {currentYear} Z3maSafe. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #2d2b55;
  color: white;
  padding: 3rem 2rem 1.5rem;
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem 1rem;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FooterSection = styled.div`
  p {
    margin: 0.5rem 0;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
  }
  
  h4 {
    margin: 0 0 1rem;
    font-size: 1.1rem;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 40px;
      height: 2px;
      background-color: #6c63ff;
    }
  }
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  h3 {
    margin: 0;
    font-size: 1.3rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 0.9rem;
  
  &:hover {
    color: #6c63ff;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 0.9rem;
  
  &:hover {
    color: #6c63ff;
  }
`;

const FooterBottom = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  
  p {
    margin: 0;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
  }
`;

export default Footer;