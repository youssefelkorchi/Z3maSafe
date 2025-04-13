import React from 'react';
import styled from 'styled-components';
import { FaShieldAlt, FaCode, FaLock, FaDesktop } from 'react-icons/fa';

const About = () => {
  return (
    <AboutContainer>
      <AboutHeader>
        <FaShieldAlt size={48} color="#6c63ff" />
        <h1>About Z3maSafe</h1>
      </AboutHeader>
      
      <AboutSection>
        <h2>What is Z3maSafe?</h2>
        <p>
          Z3maSafe is a static executable analyzer designed to help users identify potentially suspicious 
          behavior in Windows executable (.exe) files before running them. By analyzing various aspects 
          of an executable file, Z3maSafe provides insights into possible security risks without executing 
          the file itself.
        </p>
      </AboutSection>
      
      <FeaturesSection>
        <h2>Key Features</h2>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>
              <FaLock size={32} />
            </FeatureIcon>
            <h3>Privacy-Focused</h3>
            <p>All analysis is performed locally on your machine. Files are never uploaded to external servers.</p>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FaCode size={32} />
            </FeatureIcon>
            <h3>Comprehensive Analysis</h3>
            <p>Examines imports, strings, packing indicators, and applies YARA rules to detect suspicious patterns.</p>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FaDesktop size={32} />
            </FeatureIcon>
            <h3>User-Friendly Interface</h3>
            <p>Clear visualization of scan results with detailed breakdowns of potential security concerns.</p>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>
      
      <AboutSection>
        <h2>How It Works</h2>
        <p>
          Z3maSafe uses static analysis techniques to examine executable files without running them:
        </p>
        <ProcessList>
          <ProcessItem>
            <ProcessNumber>1</ProcessNumber>
            <div>
              <h3>Import Analysis</h3>
              <p>Examines the Windows API functions imported by the executable to identify potentially suspicious operations.</p>
            </div>
          </ProcessItem>
          
          <ProcessItem>
            <ProcessNumber>2</ProcessNumber>
            <div>
              <h3>String Extraction</h3>
              <p>Searches for suspicious strings that might indicate malicious intent, such as commands, URLs, or encryption references.</p>
            </div>
          </ProcessItem>
          
          <ProcessItem>
            <ProcessNumber>3</ProcessNumber>
            <div>
              <h3>Packing Detection</h3>
              <p>Identifies signs of packing or obfuscation, which are common techniques used to hide malicious code.</p>
            </div>
          </ProcessItem>
          
          <ProcessItem>
            <ProcessNumber>4</ProcessNumber>
            <div>
              <h3>YARA Rule Matching</h3>
              <p>Applies predefined patterns to detect known suspicious behaviors and malware techniques.</p>
            </div>
          </ProcessItem>
        </ProcessList>
      </AboutSection>
      
      <DisclaimerSection>
        <h2>Disclaimer</h2>
        <p>
          Z3maSafe is designed as a supplementary security tool and should not replace comprehensive 
          antivirus solutions. While it can help identify suspicious characteristics in executable files, 
          it cannot guarantee with 100% accuracy whether a file is malicious or safe. Always exercise 
          caution when running executable files from untrusted sources.
        </p>
      </DisclaimerSection>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const AboutHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  text-align: center;
  
  h1 {
    margin: 1rem 0 0;
    font-size: 2.5rem;
    color: #333;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const AboutSection = styled.section`
  margin-bottom: 3rem;
  
  h2 {
    color: #333;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: #6c63ff;
    }
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
  }
`;

const FeaturesSection = styled(AboutSection)`
  h2 {
    text-align: center;
    
    &:after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeatureCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    margin: 1rem 0;
    color: #333;
    font-size: 1.3rem;
  }
  
  p {
    margin: 0;
    color: #666;
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const FeatureIcon = styled.div`
  color: #6c63ff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: rgba(108, 99, 255, 0.1);
  margin-bottom: 1rem;
`;

const ProcessList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ProcessItem = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  
  h3 {
    margin: 0 0 0.5rem;
    color: #333;
    font-size: 1.2rem;
  }
  
  p {
    margin: 0;
    color: #666;
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const ProcessNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #6c63ff;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const DisclaimerSection = styled(AboutSection)`
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  border-left: 4px solid #ffc107;
  
  h2 {
    color: #333;
    
    &:after {
      background-color: #ffc107;
    }
  }
  
  p {
    color: #555;
  }
`;

export default About;