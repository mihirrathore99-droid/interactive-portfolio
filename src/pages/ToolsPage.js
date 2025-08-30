// frontend/src/pages/ToolsPage.js

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import CoverLetter from '../components/CoverLetter';
import Tabs from '../components/Tabs'; // Import the new Tabs component
import '../App.css';

function ToolsPage() {
  // --- STATE ---
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedExperiences, setSelectedExperiences] = useState({});
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [isLoadingCoverLetter, setIsLoadingCoverLetter] = useState(false);

  // New state for managing the active tab
  const [activeTab, setActiveTab] = useState('cv');

  // --- EFFECTS ---
  useEffect(() => {
    // ... (fetchData function remains exactly the same)
    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5001/api/profile');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setProfileData(data);
            const initialSelection = {};
            data.experience.forEach(job => {
                initialSelection[job.id] = true;
            });
            setSelectedExperiences(initialSelection);
        } catch (error) {
            console.error("Failed to fetch profile data:", error);
            setError(error.toString());
        }
    };
    fetchData();
  }, []);

  // --- HANDLERS ---
  // ... (All handler functions - handleToggleExperience, handleGeneratePdf, handleGenerateCoverLetter - remain exactly the same)
  const handleToggleExperience = (jobId) => setSelectedExperiences(prevState => ({ ...prevState, [jobId]: !prevState[jobId] }));
  
  const handleGeneratePdf = async () => {
    const selectedIds = Object.keys(selectedExperiences).filter(id => selectedExperiences[id]);
    setIsLoadingPdf(true);
    try {
      const response = await fetch('http://127.0.0.1:5001/api/generate-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selected_ids: selectedIds }),
      });
      if (!response.ok) throw new Error('PDF generation failed on the server.');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'Mihir_Rathore_CV.pdf';
      document.body.appendChild(a); a.click();
      window.URL.revokeObjectURL(url); document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating or downloading PDF:', error);
      alert('Failed to generate PDF. Please check the console for errors.');
    } finally { setIsLoadingPdf(false); }
  };
  
  const handleGenerateCoverLetter = async () => {
    setGeneratedCoverLetter(''); setIsLoadingCoverLetter(true);
    try {
      const response = await fetch('http://127.0.0.1:5001/api/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_description: jobDescription }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to generate cover letter.');
      setGeneratedCoverLetter(data.cover_letter);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      setGeneratedCoverLetter(`Error: ${error.message}`);
    } finally { setIsLoadingCoverLetter(false); }
  };

  // --- RENDER LOGIC ---
  if (error) return <div className="App"><h1>Error: {error}</h1></div>;
  if (!profileData) return <div className="cv-container"><h1>Loading...</h1></div>;

  return (
    <div className="cv-container">
      <Header personalData={profileData.personal_data} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* --- Tab Content --- */}
      {activeTab === 'cv' && (
        <>
          <Experience 
            experiences={profileData.experience} 
            selectedExperiences={selectedExperiences}
            onToggleExperience={handleToggleExperience}
          />
          <Education education={profileData.education} />
          <Projects projects={profileData.academic_projects} />
          <Skills skills={profileData.skills} />
          <div className="footer-controls">
            <button onClick={handleGeneratePdf} className="generate-btn" disabled={isLoadingPdf}>
              {isLoadingPdf ? 'Generating...' : 'Generate Tailored PDF'}
            </button>
          </div>
        </>
      )}

      {activeTab === 'letter' && (
        <CoverLetter 
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          onGenerate={handleGenerateCoverLetter}
          isLoading={isLoadingCoverLetter}
          generatedLetter={generatedCoverLetter}
        />
      )}
    </div>
  );
}

export default ToolsPage;