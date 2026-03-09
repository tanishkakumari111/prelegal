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
      setTimeout(() => {
        document.getElementById('nda-document')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      alert('Please fill in all required fields');
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
      
      const formatDate = (dateString: string) => {
        if (!dateString) return '______';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      };

      const getMNATermText = () => {
        switch (formData.mndTerm) {
          case '1year': return '1 year';
          case '2years': return '2 years';
          case '3years': return '3 years';
          case 'perpetual': return 'until terminated in accordance with the terms of this MNDA';
          default: return '1 year';
        }
      };

      const getConfidentialityTermText = () => {
        switch (formData.confidentialityTerm) {
          case '1year': return '1 year';
          case '2years': return '2 years';
          case '3years': return '3 years';
          case 'perpetual': return 'in perpetuity, but in the case of trade secrets, until the Confidential Information is no longer considered a trade secret under applicable laws';
          default: return '1 year';
        }
      };
      
      // Create a simple PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      });
      
      let yPos = 0.5;
      const leftMargin = 0.5;
      const rightMargin = 8;
      const maxWidth = rightMargin - leftMargin;
      const pageWidth = 8.5;
      const pageHeight = 11;
      
      const checkNewPage = () => {
        if (yPos > pageHeight - 0.5) {
          pdf.addPage();
          yPos = 0.5;
        }
      };
      
      const addText = (text: string, bold = false, underline = false, fontSize = 11, align: 'left' | 'center' = 'left') => {
        pdf.setFont('times', bold ? 'bold' : 'normal');
        pdf.setFontSize(fontSize);
        
        const lines = pdf.splitTextToSize(text, maxWidth);
        
        lines.forEach((line: string) => {
          checkNewPage();
          let xPos = leftMargin;
          if (align === 'center') {
            xPos = pageWidth / 2;
            pdf.text(line, xPos, yPos, { align: 'center' });
          } else {
            pdf.text(line, xPos, yPos);
          }
          yPos += (fontSize / 72) * 1.4;
        });
        
        if (underline && lines.length === 0) {
          yPos += (fontSize / 72) * 1.4;
        }
      };
      
      const addBlankLine = (lines = 1) => {
        for (let i = 0; i < lines; i++) {
          checkNewPage();
          yPos += 11 / 72 * 1.2;
        }
      };
      
      // Title
      addText('', false, false, 14);
      addText('MUTUAL NON-DISCLOSURE AGREEMENT', true, true, 14, 'center');
      addText('', false, false, 10);
      addText('(Also known as a Mutual Confidentiality Agreement)', false, false, 10, 'center');
      addBlankLine(2);
      
      // Introduction
      addText('1. INTRODUCTION', true, true, 11);
      addBlankLine(1);
      addText('This Mutual Non-Disclosure Agreement (this "MNDA") allows each party ("Disclosing Party") to disclose or make available information in connection with the Purpose which (1) the Disclosing Party identifies to the receiving party ("Receiving Party") as "confidential", "proprietary", or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure ("Confidential Information").');
      addBlankLine(1);
      addText(`This MNDA is entered into as of ${formatDate(formData.date)} (the "Effective Date"), by and between:`);
      addBlankLine(1);
      addText(`${formData.partyAName || '[PARTY A NAME]'} ("Party A"), with its principal place of business at ${formData.partyAAddress || '[PARTY A ADDRESS]'};`);
      addText('and');
      addText(`${formData.partyBName || '[PARTY B NAME]'} ("Party B"), with its principal place of business at ${formData.partyBAddress || '[PARTY B ADDRESS]'}.`);
      addBlankLine(1);
      addText('Party A and Party B may be referred to individually as a "Party" and collectively as the "Parties."');
      addBlankLine(2);
      
      // Purpose
      addText('PURPOSE', true, true, 11);
      addBlankLine(1);
      addText(`The Parties wish to explore a potential business relationship (the "Purpose") concerning: ${formData.purpose || '[PURPOSE]'}.`);
      addBlankLine(2);
      
      // Use and Protection
      addText('2. USE AND PROTECTION OF CONFIDENTIAL INFORMATION', true, true, 11);
      addBlankLine(1);
      addText('The Receiving Party shall:');
      addBlankLine(1);
      addText('(a) use Confidential Information solely for the Purpose;');
      addText('(b) not disclose Confidential Information to third parties without the Disclosing Party\'s prior written approval, except that the Receiving Party may disclose Confidential Information to its employees, agents, advisors, contractors and other representatives having a reasonable need to know for the Purpose, provided these representatives are bound by confidentiality obligations no less protective of the Disclosing Party than the applicable terms in this MNDA and the Receiving Party remains responsible for their compliance with this MNDA; and');
      addText('(c) protect Confidential Information using at least the same protections the Receiving Party uses for its own similar information but no less than a reasonable standard of care.');
      addBlankLine(2);
      
      // Exceptions
      addText('3. EXCEPTIONS', true, true, 11);
      addBlankLine(1);
      addText('The Receiving Party\'s obligations in this MNDA do not apply to information that it can demonstrate:');
      addBlankLine(1);
      addText('(a) is or becomes publicly available through no fault of the Receiving Party;');
      addText('(b) it rightfully knew or possessed prior to receipt from the Disclosing Party without confidentiality restrictions;');
      addText('(c) it rightfully obtained from a third party without confidentiality restrictions; or');
      addText('(d) it independently developed without using or referencing the Confidential Information.');
      addBlankLine(2);
      
      // Disclosures Required by Law
      addText('4. DISCLOSURES REQUIRED BY LAW', true, true, 11);
      addBlankLine(1);
      addText('The Receiving Party may disclose Confidential Information to the extent required by law, regulation or regulatory authority, subpoena or court order, provided (to the extent legally permitted) it provides the Disclosing Party reasonable advance notice of the required disclosure and reasonably cooperates, at the Disclosing Party\'s expense, with the Disclosing Party\'s efforts to obtain confidential treatment for the Confidential Information.');
      addBlankLine(2);
      
      // Term and Termination
      addText('5. TERM AND TERMINATION', true, true, 11);
      addBlankLine(1);
      addText(`This MNDA commences on the Effective Date and expires at the end of ${getMNATermText()} from the Effective Date, unless earlier terminated as provided below.`);
      addBlankLine(1);
      addText('Either party may terminate this MNDA for any or no reason upon written notice to the other party.');
      addBlankLine(1);
      addText(`The Receiving Party\'s obligations relating to Confidential Information will survive for ${getConfidentialityTermText()} from the Effective Date, despite any expiration or termination of this MNDA.`);
      addBlankLine(2);
      
      // Return or Destruction
      addText('6. RETURN OR DESTRUCTION OF CONFIDENTIAL INFORMATION', true, true, 11);
      addBlankLine(1);
      addText('Upon expiration or termination of this MNDA or upon the Disclosing Party\'s earlier request, the Receiving Party will:');
      addBlankLine(1);
      addText('(a) cease using Confidential Information;');
      addText('(b) promptly after the Disclosing Party\'s written request, destroy all Confidential Information in the Receiving Party\'s possession or control or return it to the Disclosing Party; and');
      addText('(c) if requested by the Disclosing Party, confirm its compliance with these obligations in writing.');
      addBlankLine(1);
      addText('As an exception to subsection (b), the Receiving Party may retain Confidential Information in accordance with its standard backup or record retention policies or as required by law, but the terms of this MNDA will continue to apply to the retained Confidential Information.');
      addBlankLine(2);
      
      // Proprietary Rights
      addText('7. PROPRIETARY RIGHTS', true, true, 11);
      addBlankLine(1);
      addText('Each Party retains all of its intellectual property and other rights in its Confidential Information and its disclosure to the Receiving Party grants no license under such rights.');
      addBlankLine(2);
      
      // Disclaimer
      addText('8. DISCLAIMER', true, true, 11);
      addBlankLine(1);
      addText('ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS", WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.');
      addBlankLine(2);
      
      // Governing Law
      addText('9. GOVERNING LAW AND JURISDICTION', true, true, 11);
      addBlankLine(1);
      addText(`This MNDA and all matters relating hereto are governed by, and construed in accordance with, the laws of the State of ${formData.governingLaw || '[STATE]'}, without regard to the conflict of laws provisions of such State. Any legal suit, action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in ${formData.jurisdiction || '[JURISDICTION]'}. Each party irrevocably submits to the exclusive jurisdiction of such courts in any such suit, action, or proceeding.`);
      addBlankLine(2);
      
      // Equitable Relief
      addText('10. EQUITABLE RELIEF', true, true, 11);
      addBlankLine(1);
      addText('A breach of this MNDA may cause irreparable harm for which monetary damages are an insufficient remedy. Upon a breach of this MNDA, the Disclosing Party is entitled to seek appropriate equitable relief, including an injunction, in addition to its other remedies.');
      addBlankLine(2);
      
      // General
      addText('11. GENERAL', true, true, 11);
      addBlankLine(1);
      addText('Neither party has an obligation under this MNDA to disclose Confidential Information to the other or proceed with any proposed transaction. Neither party may assign this MNDA without the prior written consent of the other party, except that either party may assign this MNDA in connection with a merger, reorganization, acquisition or other transfer of all or substantially all its assets or voting securities. Any assignment in violation of this Section is null and void. This MNDA will bind and inure to the benefit of each party\'s permitted successors and assigns. This MNDA (including this Cover Page) constitutes the entire agreement of the parties with respect to its subject matter, and supersedes all prior and contemporaneous understandings, agreements, representations, and warranties, whether written or oral, regarding such subject matter.');
      addBlankLine(3);
      
      // Signature Blocks
      addText('PARTY A:', true, false, 11);
      addBlankLine(1);
      addText(formData.partyAName || '[PARTY A NAME]');
      addBlankLine(4);
      addText('By: _____________________________');
      addText('Name: ___________________________');
      addText('Title: ____________________________');
      addText('Date: ____________________________');
      addBlankLine(2);
      addText(`Notice Address: ${formData.partyANoticeAddress || '[NOTICE ADDRESS]'}`);
      addBlankLine(3);
      
      addText('PARTY B:', true, false, 11);
      addBlankLine(1);
      addText(formData.partyBName || '[PARTY B NAME]');
      addBlankLine(4);
      addText('By: _____________________________');
      addText('Name: ___________________________');
      addText('Title: ____________________________');
      addText('Date: ____________________________');
      addBlankLine(2);
      addText(`Notice Address: ${formData.partyBNoticeAddress || '[NOTICE ADDRESS]'}`);
      
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
