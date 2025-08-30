// frontend/src/components/CoverLetter.js

import React, { useState } from 'react';
import Spinner from './Spinner'; // Import the new Spinner component

const CoverLetter = ({ jobDescription, setJobDescription, onGenerate, isLoading, generatedLetter }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy Text');

  const handleCopy = () => {
    if (generatedLetter) {
      navigator.clipboard.writeText(generatedLetter).then(() => {
        setCopyButtonText('Copied!');
        setTimeout(() => setCopyButtonText('Copy Text'), 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        setCopyButtonText('Error!');
        setTimeout(() => setCopyButtonText('Copy Text'), 2000);
      });
    }
  };

  return (
    <section className="cv-section">
      <div className="section-header">
        <h2>Cover Letter Generator</h2>
        <p className="section-hint">(Paste a job description to generate a draft)</p>
      </div>
      <div className="cover-letter-generator">
        <textarea
          className="job-description-textarea"
          placeholder="Paste the full job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <button
          className="generate-btn"
          onClick={onGenerate}
          disabled={isLoading || !jobDescription}
        >
          {/* We remove the "Generating..." text from the button now */}
          Generate Cover Letter
        </button>

        {/* --- REFINED OUTPUT AREA --- */}
        {/* This container will now appear as soon as the button is clicked */}
        {(isLoading || generatedLetter) && (
          <div className="generated-letter-container">
            <div className="generated-letter-header">
              <h3>{isLoading ? 'Generating Draft...' : 'Generated Draft:'}</h3>
              {/* Only show the copy button if not loading and there's a letter */}
              {!isLoading && generatedLetter && (
                <button className="copy-btn" onClick={handleCopy}>
                  {copyButtonText}
                </button>
              )}
            </div>

            <div className="output-area">
              {isLoading ? (
                <div className="spinner-container">
                  <Spinner />
                </div>
              ) : (
                <textarea
                  className="generated-letter-textarea"
                  value={generatedLetter}
                  readOnly
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoverLetter;