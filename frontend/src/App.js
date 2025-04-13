// Update the imports at the top of the file
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import styled from 'styled-components';
import { FaShieldAlt, FaUpload, FaExclamationTriangle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import About from './pages/About';
import Documentation from './pages/Documentation';

// API endpoint
const API_URL = 'http://localhost:8000';

// Main scanner component that will be the homepage
function Scanner() {
  // State management remains the same
  const [scanResult, setScanResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // onDrop function remains the same
  const onDrop = async (acceptedFiles) => {
    // Reset states
    setError(null);
    setScanResult(null);
    setIsLoading(true);

    const file = acceptedFiles[0];
    
    // Check if file is an .exe
    if (!file.name.toLowerCase().endsWith('.exe')) {
      setError('Only .exe files are supported');
      setIsLoading(false);
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send file to backend
      const response = await axios.post(`${API_URL}/scan`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setScanResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error scanning file');
    } finally {
      setIsLoading(false);
    }
  };

  // Dropzone and utility functions remain the same
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/x-msdownload': ['.exe'],
    },
    maxFiles: 1
  });

  // Get risk color based on sus level
  const getRiskColor = (level) => {
    if (level <= 30) return '#4CAF50'; // Green
    if (level <= 70) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  // Get risk icon based on category
  const getRiskIcon = (category) => {
    switch (category) {
      case 'GREEN':
        return <FaCheckCircle size={24} color="#4CAF50" />;
      case 'YELLOW':
        return <FaExclamationTriangle size={24} color="#FFC107" />;
      case 'RED':
        return <FaTimesCircle size={24} color="#F44336" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header>
        <Logo>
          <FaShieldAlt size={32} />
          <h1>Z3maSafe</h1>
        </Logo>
        <Subtitle>Static .exe Analyzer</Subtitle>
      </Header>

      <MainContent>
        <DropzoneContainer 
          {...getRootProps()} 
          isDragActive={isDragActive}
          isError={!!error}
        >
          <input {...getInputProps()} />
          <DropzoneContent>
            <FaUpload size={48} color="#6c63ff" />
            <p>Drag & drop an .exe file here, or click to select</p>
            <small>Files are analyzed locally and never uploaded to external servers</small>
          </DropzoneContent>
        </DropzoneContainer>

        {isLoading && (
          <LoadingContainer>
            <Spinner />
            <p>Analyzing file...</p>
          </LoadingContainer>
        )}

        {error && (
          <ErrorContainer>
            <FaExclamationTriangle size={24} color="#F44336" />
            <p>{error}</p>
          </ErrorContainer>
        )}

        {scanResult && !isLoading && (
          <ResultsContainer>
            <ResultHeader>
              <h2>Scan Results</h2>
              <FileInfo>
                <p><strong>File:</strong> {scanResult.filename}</p>
                <p><strong>Size:</strong> {formatFileSize(scanResult.filesize)}</p>
              </FileInfo>
            </ResultHeader>

            <SusLevelContainer>
              <SusLevelHeader>
                <h3>Suspicion Level</h3>
                {getRiskIcon(scanResult.risk_category)}
              </SusLevelHeader>
              <SusLevelBar>
                <SusLevelFill 
                  style={{ 
                    width: `${scanResult.scores.sus_level}%`,
                    backgroundColor: getRiskColor(scanResult.scores.sus_level)
                  }} 
                />
              </SusLevelBar>
              <SusLevelValue color={getRiskColor(scanResult.scores.sus_level)}>
                {scanResult.scores.sus_level}
              </SusLevelValue>
            </SusLevelContainer>

            <ScoresContainer>
              <ScoreItem>
                <h4>Imports</h4>
                <ScoreBar>
                  <ScoreFill width={scanResult.scores.imports_score} color="#3F51B5" />
                </ScoreBar>
                <ScoreValue>{Math.round(scanResult.scores.imports_score)}</ScoreValue>
              </ScoreItem>
              <ScoreItem>
                <h4>Strings</h4>
                <ScoreBar>
                  <ScoreFill width={scanResult.scores.strings_score} color="#009688" />
                </ScoreBar>
                <ScoreValue>{Math.round(scanResult.scores.strings_score)}</ScoreValue>
              </ScoreItem>
              <ScoreItem>
                <h4>Packing</h4>
                <ScoreBar>
                  <ScoreFill width={scanResult.scores.packing_score} color="#FF5722" />
                </ScoreBar>
                <ScoreValue>{Math.round(scanResult.scores.packing_score)}</ScoreValue>
              </ScoreItem>
              <ScoreItem>
                <h4>Rules</h4>
                <ScoreBar>
                  <ScoreFill width={scanResult.scores.rules_score} color="#9C27B0" />
                </ScoreBar>
                <ScoreValue>{Math.round(scanResult.scores.rules_score)}</ScoreValue>
              </ScoreItem>
            </ScoresContainer>

            <DetailsTabs scanResult={scanResult} />
          </ResultsContainer>
        )}
      </MainContent>
    </>
  );
}

// Main App component with routing
function App() {
  return (
    <Router>
      <AppContainer>
        <Navigation />
        <Routes>
          <Route path="/" element={<Scanner />} />
          <Route path="/about" element={<About />} />
          <Route path="/docs" element={<Documentation />} />
        </Routes>
        <Footer />
      </AppContainer>
    </Router>
  );
}

// DetailsTabs component for showing detailed scan results
function DetailsTabs({ scanResult }) {
  const [activeTab, setActiveTab] = useState('imports');

  return (
    <DetailsContainer>
      <TabsHeader>
        <TabButton 
          active={activeTab === 'imports'} 
          onClick={() => setActiveTab('imports')}
        >
          Suspicious Imports
        </TabButton>
        <TabButton 
          active={activeTab === 'strings'} 
          onClick={() => setActiveTab('strings')}
        >
          Suspicious Strings
        </TabButton>
        <TabButton 
          active={activeTab === 'packing'} 
          onClick={() => setActiveTab('packing')}
        >
          Packing Indicators
        </TabButton>
        <TabButton 
          active={activeTab === 'rules'} 
          onClick={() => setActiveTab('rules')}
        >
          Rule Matches
        </TabButton>
        <TabButton 
          active={activeTab === 'hashes'} 
          onClick={() => setActiveTab('hashes')}
        >
          File Hashes
        </TabButton>
      </TabsHeader>

      <TabContent>
        {activeTab === 'imports' && (
          <div>
            {scanResult.imports.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th>Import</th>
                    <th>Library</th>
                    <th>Risk Score</th>
                  </tr>
                </thead>
                <tbody>
                  {scanResult.imports.map((imp, index) => (
                    <tr key={index}>
                      <td>{imp.name}</td>
                      <td>{imp.library}</td>
                      <td>
                        <ScoreChip score={imp.score}>{imp.score}</ScoreChip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <EmptyState>No suspicious imports detected</EmptyState>
            )}
          </div>
        )}

        {activeTab === 'strings' && (
          <div>
            {scanResult.suspicious_strings.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th>String</th>
                    <th>Risk Score</th>
                  </tr>
                </thead>
                <tbody>
                  {scanResult.suspicious_strings.map((str, index) => (
                    <tr key={index}>
                      <td>{str.string}</td>
                      <td>
                        <ScoreChip score={str.score}>{str.score}</ScoreChip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <EmptyState>No suspicious strings detected</EmptyState>
            )}
          </div>
        )}

        {activeTab === 'packing' && (
          <div>
            {scanResult.packing_indicators.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Details</th>
                    <th>Risk Score</th>
                  </tr>
                </thead>
                <tbody>
                  {scanResult.packing_indicators.map((indicator, index) => (
                    <tr key={index}>
                      <td>{indicator.type}</td>
                      <td>
                        {indicator.type === 'high_entropy' && 
                          `Section: ${indicator.section}, Entropy: ${indicator.entropy.toFixed(2)}`}
                        {indicator.type === 'section_name' && 
                          `Section: ${indicator.name}, Packer: ${indicator.packer}`}
                        {indicator.type === 'few_imports' && 
                          `Import count: ${indicator.count}`}
                        {indicator.type === 'no_imports' && 
                          'No imports found (highly suspicious)'}
                      </td>
                      <td>
                        <ScoreChip score={indicator.score}>{indicator.score}</ScoreChip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <EmptyState>No packing indicators detected</EmptyState>
            )}
          </div>
        )}

        {activeTab === 'rules' && (
          <div>
            {scanResult.rule_matches.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th>Rule</th>
                    <th>Description</th>
                    <th>Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {scanResult.rule_matches.map((rule, index) => (
                    <tr key={index}>
                      <td>{rule.rule}</td>
                      <td>{rule.description}</td>
                      <td>
                        <SeverityChip severity={rule.severity}>
                          {rule.severity.toUpperCase()}
                        </SeverityChip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <EmptyState>No rule matches detected</EmptyState>
            )}
          </div>
        )}

        {activeTab === 'hashes' && (
          <div>
            <HashesContainer>
              <HashItem>
                <h4>MD5</h4>
                <HashValue>{scanResult.md5}</HashValue>
              </HashItem>
              <HashItem>
                <h4>SHA256</h4>
                <HashValue>{scanResult.sha256}</HashValue>
              </HashItem>
            </HashesContainer>
          </div>
        )}
      </TabContent>
    </DetailsContainer>
  );
}

// Helper function to format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f5f7fa;
  transition: all 0.3s ease;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #6c63ff 0%, #4834d4 100%);
  padding: 1.5rem 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: white;
  
  h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    
    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }
`;

const Subtitle = styled.p`
  margin: 0.5rem 0 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 300;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const DropzoneContainer = styled.div`
  border: 2px dashed ${props => props.isError ? '#F44336' : props.isDragActive ? '#6c63ff' : '#ccc'};
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  background-color: ${props => props.isDragActive ? 'rgba(108, 99, 255, 0.05)' : '#fff'};
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
  &:hover {
    border-color: #6c63ff;
    background-color: rgba(108, 99, 255, 0.05);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(108, 99, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const DropzoneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  
  p {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
    
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
  
  small {
    color: #666;
    font-size: 0.9rem;
    
    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  gap: 1.5rem;
  
  p {
    margin: 0;
    color: #666;
    font-size: 1.1rem;
    
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(108, 99, 255, 0.1);
  border-radius: 50%;
  border-top: 4px solid #6c63ff;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1.5rem;
  padding: 1.2rem;
  background-color: #FFEBEE;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(244, 67, 54, 0.1);
  
  p {
    margin: 0;
    color: #D32F2F;
    font-weight: 500;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    font-size: 0.9rem;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 2.5rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ResultHeader = styled.div`
  padding: 1.8rem 2rem;
  border-bottom: 1px solid #eee;
  background-color: #f9f9f9;
  
  h2 {
    margin: 0 0 0.8rem;
    color: #333;
    font-size: 1.8rem;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    
    h2 {
      font-size: 1.5rem;
    }
  }
`;

const FileInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  
  p {
    margin: 0;
    color: #555;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
    flex-direction: column;
    
    p {
      font-size: 0.9rem;
    }
  }
`;

const SusLevelContainer = styled.div`
  padding: 1.8rem 2rem;
  border-bottom: 1px solid #eee;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SusLevelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
  
  h3 {
    margin: 0;
    color: #333;
    font-size: 1.4rem;
    font-weight: 600;
  }
  
  @media (max-width: 480px) {
    h3 {
      font-size: 1.2rem;
    }
  }
`;

const SusLevelBar = styled.div`
  height: 24px;
  background-color: #eee;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SusLevelFill = styled.div`
  height: 100%;
  transition: width 0.8s ease-out;
`;

const SusLevelValue = styled.div`
  text-align: right;
  margin-top: 0.8rem;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.color};
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ScoresContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1.8rem 2rem;
  border-bottom: 1px solid #eee;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.2rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const ScoreItem = styled.div`
  h4 {
    margin: 0 0 0.8rem;
    color: #333;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  @media (max-width: 480px) {
    h4 {
      font-size: 1rem;
    }
  }
`;

const ScoreBar = styled.div`
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const ScoreFill = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${props => props.color};
  transition: width 0.6s ease-out;
`;

const ScoreValue = styled.div`
  text-align: right;
  margin-top: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const DetailsContainer = styled.div`
  padding: 0;
`;

const TabsHeader = styled.div`
  display: flex;
  overflow-x: auto;
  border-bottom: 1px solid #eee;
  background-color: #f9f9f9;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const TabButton = styled.button`
  padding: 1.2rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#6c63ff' : 'transparent'};
  color: ${props => props.active ? '#6c63ff' : '#666'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'rgba(108, 99, 255, 0.05)' : '#f5f5f5'};
    color: ${props => props.active ? '#6c63ff' : '#333'};
  }
  
  @media (max-width: 768px) {
    padding: 1rem 1.2rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1rem;
    font-size: 0.8rem;
  }
`;

const TabContent = styled.div`
  padding: 1.8rem 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.2rem 1rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    font-weight: 600;
    color: #333;
    background-color: #f9f9f9;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  tr:hover td {
    background-color: #f9f9f9;
  }
  
  @media (max-width: 768px) {
    th, td {
      padding: 0.8rem;
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 480px) {
    display: block;
    overflow-x: auto;
    
    th, td {
      padding: 0.7rem;
      font-size: 0.8rem;
    }
  }
`;

const ScoreChip = styled.span`
  display: inline-block;
  padding: 0.3rem 0.6rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  background-color: ${props => {
    if (props.score <= 30) return '#4CAF50';
    if (props.score <= 70) return '#FFC107';
    return '#F44336';
  }};
  box-shadow: 0 2px 4px ${props => {
    if (props.score <= 30) return 'rgba(76, 175, 80, 0.2)';
    if (props.score <= 70) return 'rgba(255, 193, 7, 0.2)';
    return 'rgba(244, 67, 54, 0.2)';
  }};
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
`;

const SeverityChip = styled.span`
  display: inline-block;
  padding: 0.3rem 0.6rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  background-color: ${props => {
    if (props.severity === 'low') return '#4CAF50';
    if (props.severity === 'medium') return '#FFC107';
    return '#F44336';
  }};
  box-shadow: 0 2px 4px ${props => {
    if (props.severity === 'low') return 'rgba(76, 175, 80, 0.2)';
    if (props.severity === 'medium') return 'rgba(255, 193, 7, 0.2)';
    return 'rgba(244, 67, 54, 0.2)';
  }};
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
  font-size: 1.1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  
  @media (max-width: 480px) {
    padding: 2rem 1rem;
    font-size: 0.9rem;
  }
`;

const HashesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 480px) {
    gap: 1.2rem;
  }
`;

const HashItem = styled.div`
  h4 {
    margin: 0 0 0.8rem;
    color: #333;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  @media (max-width: 480px) {
    h4 {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
  }
`;

const HashValue = styled.code`
  display: block;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  word-break: break-all;
  font-size: 0.9rem;
  border: 1px solid #eee;
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.8rem;
  }
`;

export default App;
