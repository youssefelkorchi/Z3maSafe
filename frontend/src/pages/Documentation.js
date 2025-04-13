import React from 'react';
import styled from 'styled-components';
import { FaBook, FaExclamationTriangle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Documentation = () => {
  return (
    <DocContainer>
      <DocHeader>
        <FaBook size={48} color="#6c63ff" />
        <h1>Documentation</h1>
        <p>Learn how to use Z3maSafe and interpret scan results</p>
      </DocHeader>
      
      <TableOfContents>
        <h2>Contents</h2>
        <TocList>
          <TocItem><a href="#getting-started">Getting Started</a></TocItem>
          <TocItem><a href="#scan-results">Understanding Scan Results</a></TocItem>
          <TocItem><a href="#risk-levels">Risk Levels Explained</a></TocItem>
          <TocItem><a href="#analysis-types">Types of Analysis</a></TocItem>
          <TocItem><a href="#limitations">Limitations</a></TocItem>
          <TocItem><a href="#faq">Frequently Asked Questions</a></TocItem>
        </TocList>
      </TableOfContents>
      
      <DocSection id="getting-started">
        <h2>Getting Started</h2>
        <p>
          Using Z3maSafe is simple and straightforward. Follow these steps to analyze an executable file:
        </p>
        
        <InstructionList>
          <InstructionItem>
            <InstructionNumber>1</InstructionNumber>
            <div>
              <h3>Upload a File</h3>
              <p>Drag and drop an .exe file onto the upload area or click to browse and select a file.</p>
            </div>
          </InstructionItem>
          
          <InstructionItem>
            <InstructionNumber>2</InstructionNumber>
            <div>
              <h3>Wait for Analysis</h3>
              <p>Z3maSafe will analyze the file locally on your machine. This typically takes a few seconds.</p>
            </div>
          </InstructionItem>
          
          <InstructionItem>
            <InstructionNumber>3</InstructionNumber>
            <div>
              <h3>Review Results</h3>
              <p>Examine the overall suspicion level and detailed findings in each category.</p>
            </div>
          </InstructionItem>
          
          <InstructionItem>
            <InstructionNumber>4</InstructionNumber>
            <div>
              <h3>Make an Informed Decision</h3>
              <p>Based on the analysis, decide whether you want to run the executable or not.</p>
            </div>
          </InstructionItem>
        </InstructionList>
      </DocSection>
      
      <DocSection id="scan-results">
        <h2>Understanding Scan Results</h2>
        <p>
          After analysis, Z3maSafe provides a comprehensive report with the following components:
        </p>
        
        <ResultsExplanation>
          <ResultItem>
            <h3>Suspicion Level</h3>
            <p>
              An overall score from 0-100 indicating how suspicious the file appears. This is calculated 
              based on the combined scores from all analysis types.
            </p>
          </ResultItem>
          
          <ResultItem>
            <h3>Risk Category</h3>
            <p>
              Files are categorized into three risk levels:
            </p>
            <RiskLevels>
              <RiskLevel color="#4CAF50">
                <FaCheckCircle size={20} />
                <span>Green (0-30): Low risk</span>
              </RiskLevel>
              <RiskLevel color="#FFC107">
                <FaExclamationTriangle size={20} />
                <span>Yellow (31-70): Medium risk</span>
              </RiskLevel>
              <RiskLevel color="#F44336">
                <FaTimesCircle size={20} />
                <span>Red (71-100): High risk</span>
              </RiskLevel>
            </RiskLevels>
          </ResultItem>
          
          <ResultItem>
            <h3>Detailed Findings</h3>
            <p>
              Specific suspicious elements found in the file, organized by category (imports, strings, 
              packing indicators, and rule matches).
            </p>
          </ResultItem>
          
          <ResultItem>
            <h3>File Information</h3>
            <p>
              Basic details about the analyzed file, including name, size, and cryptographic hashes.
            </p>
          </ResultItem>
        </ResultsExplanation>
      </DocSection>
      
      <DocSection id="risk-levels">
        <h2>Risk Levels Explained</h2>
        <p>
          Understanding what each risk level means can help you make better decisions:
        </p>
        
        <RiskExplanation>
          <RiskCard color="#4CAF50">
            <h3>Low Risk (Green)</h3>
            <p>
              Files in this category show few or no suspicious characteristics. They typically use common, 
              legitimate Windows APIs and contain no suspicious strings or packing indicators.
            </p>
            <p>
              <strong>Recommendation:</strong> While generally safe, always ensure you trust the source of any executable.
            </p>
          </RiskCard>
          
          <RiskCard color="#FFC107">
            <h3>Medium Risk (Yellow)</h3>
            <p>
              Files with some suspicious characteristics that could be legitimate but warrant caution. 
              Many legitimate applications may fall into this category if they use certain APIs or contain 
              strings that could be interpreted as suspicious.
            </p>
            <p>
              <strong>Recommendation:</strong> Verify the source of the file and consider the context before running.
            </p>
          </RiskCard>
          
          <RiskCard color="#F44336">
            <h3>High Risk (Red)</h3>
            <p>
              Files with numerous suspicious characteristics commonly associated with malware. These files 
              often use APIs for process injection, keylogging, or other potentially malicious activities.
            </p>
            <p>
              <strong>Recommendation:</strong> Avoid running these files unless you fully understand and accept the risks.
            </p>
          </RiskCard>
        </RiskExplanation>
      </DocSection>
      
      <DocSection id="analysis-types">
        <h2>Types of Analysis</h2>
        
        <AnalysisTypes>
          <AnalysisType>
            <h3>Import Analysis</h3>
            <p>
              Examines the Windows API functions that the executable imports. Certain APIs are commonly 
              used for potentially malicious activities, such as process injection, keylogging, or registry 
              manipulation.
            </p>
          </AnalysisType>
          
          <AnalysisType>
            <h3>String Analysis</h3>
            <p>
              Extracts and examines text strings embedded in the executable. Suspicious strings might include 
              command-line commands, URLs, references to system directories, or terms associated with malicious 
              activities.
            </p>
          </AnalysisType>
          
          <AnalysisType>
            <h3>Packing Detection</h3>
            <p>
              Identifies signs that the executable has been packed or obfuscated. While packing has legitimate 
              uses (like compression), it's also commonly used to hide malicious code from analysis.
            </p>
          </AnalysisType>
          
          <AnalysisType>
            <h3>YARA Rule Matching</h3>
            <p>
              Applies predefined patterns (rules) to detect characteristics associated with known malicious 
              behaviors. These rules look for specific combinations of features that might indicate malware.
            </p>
          </AnalysisType>
        </AnalysisTypes>
      </DocSection>
      
      <DocSection id="limitations">
        <h2>Limitations</h2>
        <p>
          While Z3maSafe provides valuable insights, it's important to understand its limitations:
        </p>
        
        <LimitationsList>
          <LimitationItem>
            <h3>Static Analysis Only</h3>
            <p>
              Z3maSafe performs static analysis without executing the file. This means it cannot detect 
              malicious behaviors that only manifest during runtime.
            </p>
          </LimitationItem>
          
          <LimitationItem>
            <h3>False Positives</h3>
            <p>
              Legitimate software may use APIs or contain strings that trigger suspicion. This is why 
              context and source verification are important.
            </p>
          </LimitationItem>
          
          <LimitationItem>
            <h3>Advanced Evasion</h3>
            <p>
              Sophisticated malware may use advanced techniques to evade static analysis, such as 
              custom packing, encryption, or polymorphic code.
            </p>
          </LimitationItem>
          
          <LimitationItem>
            <h3>Not a Replacement for Antivirus</h3>
            <p>
              Z3maSafe should be used as a complementary tool alongside comprehensive security solutions, 
              not as a replacement.
            </p>
          </LimitationItem>
        </LimitationsList>
      </DocSection>
      
      <DocSection id="faq">
        <h2>Frequently Asked Questions</h2>
        
        <FaqList>
          <FaqItem>
            <FaqQuestion>Is my file uploaded to any server during analysis?</FaqQuestion>
            <FaqAnswer>
              No. Z3maSafe performs all analysis locally on your machine. Your files are never uploaded 
              to external servers, ensuring your privacy and data security.
            </FaqAnswer>
          </FaqItem>
          
          <FaqItem>
            <FaqQuestion>Can Z3maSafe guarantee a file is safe?</FaqQuestion>
            <FaqAnswer>
              No security tool can provide 100% guarantees. Z3maSafe helps identify suspicious characteristics, 
              but the final decision about running a file should consider multiple factors, including the file's 
              source and your specific context.
            </FaqAnswer>
          </FaqItem>
          
          <FaqItem>
            <FaqQuestion>Why might a legitimate program be flagged as suspicious?</FaqQuestion>
            <FaqAnswer>
              Legitimate software often uses APIs or contains strings that can appear suspicious out of context. 
              For example, development tools, system utilities, and security software commonly use APIs that 
              could also be used maliciously.
            </FaqAnswer>
          </FaqItem>
          
          <FaqItem>
            <FaqQuestion>How often are the detection rules updated?</FaqQuestion>
            <FaqAnswer>
              Z3maSafe's detection rules are regularly updated to improve accuracy and keep pace with evolving 
              threats. Check the GitHub repository for the latest updates and release notes.
            </FaqAnswer>
          </FaqItem>
        </FaqList>
      </DocSection>
    </DocContainer>
  );
};

const DocContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const DocHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  text-align: center;
  
  h1 {
    margin: 1rem 0 0.5rem;
    font-size: 2.5rem;
    color: #333;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    margin: 0;
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
  }
`;

const TableOfContents = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem 2rem;
  margin-bottom: 3rem;
  
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #333;
  }
`;

const TocList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
`;

const TocItem = styled.li`
  a {
    color: #6c63ff;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
    
    &:hover {
      color: #4834d4;
      text-decoration: underline;
    }
  }
`;

const DocSection = styled.section`
  margin-bottom: 4rem;
  scroll-margin-top: 100px;
  
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

const InstructionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const InstructionItem = styled.div`
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

const InstructionNumber = styled.div`
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

const ResultsExplanation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1.5rem;
`;

const ResultItem = styled.div`
  h3 {
    margin: 0 0 0.8rem;
    color: #333;
    font-size: 1.3rem;
  }
  
  p {
    margin: 0 0 1rem;
    color: #555;
  }
`;

const RiskLevels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const RiskLevel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${props => props.color};
  
  span {
    color: #333;
    font-weight: 500;
  }
`;

const RiskExplanation = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RiskCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-top: 4px solid ${props => props.color};
  
  h3 {
    margin: 0 0 1rem;
    color: ${props => props.color};
    font-size: 1.3rem;
  }
  
  p {
    margin: 0 0 1rem;
    color: #555;
    font-size: 1rem;
    line-height: 1.5;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const AnalysisTypes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AnalysisType = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  h3 {
    margin: 0 0 1rem;
    color: #333;
    font-size: 1.3rem;
  }
  
  p {
    margin: 0;
    color: #555;
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const LimitationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const LimitationItem = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  
  h3 {
    margin: 0 0 0.8rem;
    color: #333;
    font-size: 1.3rem;
  }
  
  p {
    margin: 0;
    color: #555;
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const FaqItem = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const FaqQuestion = styled.h3`
  margin: 0 0 1rem;
  color: #333;
  font-size: 1.3rem;
`;

const FaqAnswer = styled.p`
  margin: 0;
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
`;

export default Documentation;