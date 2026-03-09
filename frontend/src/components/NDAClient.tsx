'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import NDAForm, { NDAData } from './NDAForm';

// Dynamically import NDADocument to avoid SSR issues with html2pdf
const NDADocument = dynamic(() => import('./NDADocument'), { ssr: false });

// Default form data
const defaultNDAData: NDAData = {
  partyAName: '',
  partyAAddress: '',
  partyANoticeAddress: '',
  partyBName: '',
  partyBAddress: '',
  partyBNoticeAddress: '',
  date: '',
  effectiveDate: '',
  purpose: '',
  governingLaw: '',
  jurisdiction: '',
  mndTerm: '1year',
  confidentialityTerm: '1year',
};

export default function NDAClient() {
  const [formData, setFormData] = useState<NDAData>(defaultNDAData);
  const [showDocument, setShowDocument] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);

  const isFormValid = () => {
    return (
      formData.partyAName.trim() !== '' &&
      formData.partyAAddress.trim() !== '' &&
      formData.partyANoticeAddress.trim() !== '' &&
      formData.partyBName.trim() !== '' &&
      formData.partyBAddress.trim() !== '' &&
      formData.partyBNoticeAddress.trim() !== '' &&
      formData.date.trim() !== '' &&
      formData.effectiveDate.trim() !== '' &&
      formData.purpose.trim() !== '' &&
      formData.governingLaw.trim() !== '' &&
      formData.jurisdiction.trim() !== ''
    );
  };

  const handleGenerate = () => {
    if (isFormValid()) {
      setShowDocument(true);
      // Scroll to document after rendering
      setTimeout(() => {
        document.getElementById('nda-document')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleDownload = async () => {
    if (!documentRef.current) {
      console.error('Document ref is null');
      return;
    }

    setIsGenerating(true);

    try {
      // Import jspdf directly
      const { jsPDF } = await import('jspdf');
      
      const element = documentRef.current;
      
      // Get the content as HTML
      const html = element.innerHTML;
      
      // Create a simple PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      });
      
      // Add title
      pdf.setFontSize(14);
      pdf.setFont('times', 'bold');
      pdf.text('MUTUAL NON-DISCLOSURE AGREEMENT', 1, 1, { align: 'center' });
      
      pdf.setFontSize(10);
      pdf.setFont('times', 'normal');
      
      // Add content
      let yPos = 1.5;
      const leftMargin = 0.5;
      const maxWidth = 7.5;
      
      const addText = (text: string, bold = false) => {
        if (bold) {
          pdf.setFont('times', 'bold');
        } else {
          pdf.setFont('times', 'normal');
        }
        
        const lines = pdf.splitTextToSize(text, maxWidth);
        lines.forEach((line: string) => {
          if (yPos > 10) {
            pdf.addPage();
            yPos = 0.5;
          }
          pdf.text(line, leftMargin, yPos);
          yPos += 0.2;
        });
      };
      
      addText(`This Mutual Non-Disclosure Agreement ("MNDA") is entered into as of ${formData.date || '[DATE]'} (the "Effective Date"), by and between:`, true);
      addText(`${formData.partyAName || '[PARTY A NAME]'} ("Party A"), with its principal place of business at ${formData.partyAAddress || '[ADDRESS]'};`);
      addText(`and`);
      addText(`${formData.partyBName || '[PARTY B NAME]'} ("Party B"), with its principal place of business at ${formData.partyBAddress || '[ADDRESS]'}.`);
      addText('');
      addText(`PURPOSE: ${formData.purpose || '[PURPOSE]'}`, true);
      addText('');
      addText('1. CONFIDENTIAL INFORMATION', true);
      addText('"Confidential Information" means any information disclosed by either party that is marked as confidential or would reasonably be understood to be confidential.');
      addText('');
      addText('2. OBLIGATIONS', true);
      addText('The Receiving Party shall: (a) hold all Confidential Information in strict confidence; (b) use the Confidential Information solely for the Purpose; (c) protect the Confidential Information using at least reasonable care; and (d) limit access to those who have a need to know and are bound by confidentiality obligations.');
      addText('');
      addText('3. TERM', true);
      addText(`This Agreement shall commence on the Effective Date and shall continue for ${formData.mndTerm === '1year' ? '1 year' : formData.mndTerm === '2years' ? '2 years' : formData.mndTerm === '3years' ? '3 years' : 'until terminated'}.`);
      addText('');
      addText('4. GOVERNING LAW', true);
      addText(`This Agreement shall be governed by the laws of the State of ${formData.governingLaw || '[STATE]'}.`);
      
      const filename = `Mutual_NDA_${formData.partyAName.replace(/\s+/g, '_') || 'PartyA'}_${formData.partyBName.replace(/\s+/g, '_') || 'PartyB'}.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setFormData(defaultNDAData);
    setShowDocument(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white py-6 px-4 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Mutual NDA Creator</h1>
          <p className="mt-2 text-blue-100">Create a professionally drafted Mutual Non-Disclosure Agreement</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Form Section */}
        <div className="mb-8">
          <NDAForm data={formData} onChange={setFormData} />
          
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={handleGenerate}
              disabled={!isFormValid()}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isFormValid()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Generate NDA Document
            </button>
            
            {showDocument && (
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-lg font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Start Over
              </button>
            )}
          </div>

          {!isFormValid() && (
            <p className="mt-2 text-sm text-orange-600">
              Please fill in all required fields to generate the NDA document.
            </p>
          )}
        </div>

        {/* Document Section */}
        {showDocument && (
          <div id="nda-document" className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Preview Your Mutual NDA</h2>
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  isGenerating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
            </div>
            
            <NDADocument ref={documentRef} data={formData} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <p>This is a prototype for demonstration purposes. Please consult with a qualified attorney for legal advice.</p>
        </div>
      </footer>
    </div>
  );
}
