'use client';

import React, { forwardRef } from 'react';
import { NDAData } from './NDAForm';

interface NDADocumentProps {
  data: NDAData;
}

const NDADocument = forwardRef<HTMLDivElement, NDADocumentProps>(({ data }, ref) => {
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
    switch (data.mndTerm) {
      case '1year': return '1 year';
      case '2years': return '2 years';
      case '3years': return '3 years';
      case 'perpetual': return 'until terminated in accordance with the terms of this MNDA';
      default: return '1 year';
    }
  };

  const getConfidentialityTermText = () => {
    switch (data.confidentialityTerm) {
      case '1year': return '1 year';
      case '2years': return '2 years';
      case '3years': return '3 years';
      case 'perpetual': return 'in perpetuity, but in the case of trade secrets, until the Confidential Information is no longer considered a trade secret under applicable laws';
      default: return '1 year';
    }
  };

  const textStyle = { color: '#000000' } as const;
  const boldStyle = { color: '#000000', fontWeight: 'bold' as const };

  return (
    <div 
      ref={ref}
      className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-4xl mx-auto"
      style={{ 
        fontFamily: 'Times New Roman, serif', 
        fontSize: '11pt', 
        lineHeight: '1.5', 
        color: '#000000',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Header */}
      <div className="text-center mb-6" style={textStyle}>
        <h1 className="text-lg font-bold underline mb-1" style={boldStyle}>MUTUAL NON-DISCLOSURE AGREEMENT</h1>
        <p className="text-xs" style={textStyle}>(Also known as a Mutual Confidentiality Agreement)</p>
      </div>

      {/* Introduction */}
      <div className="mb-4" style={textStyle}>
        <p className="font-bold underline mb-2" style={boldStyle}>1. INTRODUCTION</p>
        <p className="mb-2" style={textStyle}>
          This Mutual Non-Disclosure Agreement (this "<strong style={boldStyle}>MNDA</strong>") allows each party ("<strong style={boldStyle}>Disclosing Party</strong>") to disclose or make available information in connection with the <strong style={boldStyle}>Purpose</strong> which (1) the Disclosing Party identifies to the receiving party ("<strong style={boldStyle}>Receiving Party</strong>") as "confidential", "proprietary", or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure ("<strong style={boldStyle}>Confidential Information</strong>").
        </p>
        <p style={textStyle}>
          This MNDA is entered into as of <strong style={boldStyle}>{formatDate(data.date)}</strong> (the "<strong style={boldStyle}>Effective Date</strong>"), by and between:
        </p>
        <div className="ml-4 mt-2 mb-2" style={textStyle}>
          <p className="mb-1" style={textStyle}><strong style={boldStyle}>{data.partyAName || '[PARTY A NAME]'}</strong> ("<strong style={boldStyle}>Party A</strong>"), with its principal place of business at {data.partyAAddress || '[PARTY A ADDRESS]'}{data.jurisdiction ? `, ${data.jurisdiction}` : ''};</p>
          <p className="mb-1" style={textStyle}>and</p>
          <p style={textStyle}><strong style={boldStyle}>{data.partyBName || '[PARTY B NAME]'}</strong> ("<strong style={boldStyle}>Party B</strong>"), with its principal place of business at {data.partyBAddress || '[PARTY B ADDRESS]'}{data.jurisdiction ? `, ${data.jurisdiction}` : ''}.</p>
        </div>
        <p style={textStyle}>
          Party A and Party B may be referred to individually as a "Party" and collectively as the "Parties."
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-4" style={textStyle}>
        <p className="font-bold underline mb-2" style={boldStyle}>PURPOSE</p>
        <p style={textStyle}>
          The Parties wish to explore a potential business relationship (the "<strong style={boldStyle}>Purpose</strong>") concerning: <strong style={boldStyle}>{data.purpose || '[PURPOSE]'}</strong>.
        </p>
      </div>

      {/* Use and Protection of Confidential Information */}
      <div className="mb-4" style={textStyle}>
        <p className="font-bold underline mb-2" style={boldStyle}>2. USE AND PROTECTION OF CONFIDENTIAL INFORMATION</p>
        <p className="mb-2" style={textStyle}>The Receiving Party shall:</p>
        <div className="ml-4 mb-2" style={textStyle}>
          <p style={textStyle}>(a) use Confidential Information solely for the <strong style={boldStyle}>Purpose</strong>;</p>
          <p style={textStyle}>(b) not disclose Confidential Information to third parties without the Disclosing Party's prior written approval, except that the Receiving Party may disclose Confidential Information to its employees, agents, advisors, contractors and other representatives having a reasonable need to know for the <strong style={boldStyle}>Purpose</strong>, provided these representatives are bound by confidentiality obligations no less protective of the Disclosing Party than the applicable terms in this MNDA and the Receiving Party remains responsible for their compliance with this MNDA; and</p>
          <p style={textStyle}>(c) protect Confidential Information using at least the same protections the Receiving Party uses for its own similar information but no less than a reasonable standard of care.</p>
        </div>
      </div>

      {/* Exceptions */}
      <div className="mb-4" style={textStyle}>
        <p className="font-bold underline mb-2" style={boldStyle}>3. EXCEPTIONS</p>
        <p style={textStyle}>The Receiving Party's obligations in this MNDA do not apply to information that it can demonstrate:</p>
        <div className="ml-4 mb-2" style={textStyle}>
          <p style={textStyle}>(a) is or becomes publicly available through no fault of the Receiving Party;</p>
          <p style={textStyle}>(b) it rightfully knew or possessed prior to receipt from the Disclosing Party without confidentiality restrictions;</p>
          <p style={textStyle}>(c) it rightfully obtained from a third party without confidentiality restrictions; or</p>
          <p style={textStyle}>(d) it independently developed without using or referencing the Confidential Information.</p>
        </div>
      </div>

      {/* Disclosures Required by Law */}
      <div className="mb-4" style={textStyle}>
        <p className="font-bold underline mb-2" style={boldStyle}>4. DISCLOSURES REQUIRED BY LAW</p>
        <p style={textStyle}>
          The Receiving Party may disclose Confidential Information to the extent required by law, regulation or regulatory authority, subpoena or court order, provided (to the extent legally permitted) it provides the Disclosing Party reasonable advance notice of the required disclosure and reasonably cooperates, at the Disclosing Party's expense, with the Disclosing Party's efforts to obtain confidential treatment for the Confidential Information.
        </p>
      </div>

      {/* Term and Termination */}
      <div className="mb-4" style={textStyle}>
        <p className="font-bold underline mb-2" style={boldStyle}>5. TERM AND TERMINATION</p>
        <p className="mb-2" style={textStyle}>
          This MNDA commences on the <strong style={boldStyle}>Effective Date</strong> and expires at the end of <strong style={boldStyle}>{getMNATermText()}</strong> from the Effective Date, unless earlier terminated as provided below.
        </p>
        <p className="mb-2" style={textStyle}>
          Either party may terminate this MNDA for any or no reason upon written notice to the other party. 
        </p>
        <p style={textStyle}>
          The Receiving Party's obligations relating to Confidential Information will survive for <strong style={boldStyle}>{getConfidentialityTermText()}</strong> from the Effective Date, despite any expiration or termination of this MNDA.
        </p>
      </div>

      {/* Return or Destruction of Confidential Information */}
      <div className="mb-4" style={textStyle}>
        <p className="font-bold underline mb-2" style={boldStyle}>6. RETURN OR DESTRUCTION OF CONFIDENTIAL INFORMATION</p>
        <p className="mb-2" style={textStyle}>
          Upon expiration or termination of this MNDA or upon the Disclosing Party's earlier request, the Receiving Party will:
        </p>
        <div className="ml-4 mb-2" style={textStyle}>
          <p style={textStyle}>(a) cease using Confidential Information;</p>
          <p style={textStyle}>(b) promptly after the Disclosing Party's written request, destroy all Confidential Information in the Receiving Party's possession or control or return it to the Disclosing Party; and</p>
          <p style={textStyle}>(c) if requested by the Disclosing Party, confirm its compliance with these obligations in writing.</p>
        </div>
        <p style={textStyle}>
          As an exception to subsection (b), the Receiving Party may retain Confidential Information in accordance with its standard backup or record retention policies or as required by law, but the terms of this MNDA will continue to apply to the retained Confidential Information.
        </p>
      </div>

      {/* Proprietary Rights */}
      <div className="mb-4" style={textStyle}>
        <p className="font-bold underline mb-2" style={boldStyle}>7. PROPRIETARY RIGHTS</p>
        <p style={textStyle}>
          Each Party retains all of its intellectual property and other rights in its Confidential Information and its disclosure to the Receiving Party grants no license under such rights.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mb-4" style={textStyle}>
        <p className="font-bold underline mb-2" style={boldStyle}>8. DISCLAIMER</p>
        <p style={textStyle}>
          ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS", WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
        </p>
      </div>

      {/* Governing Law and Jurisdiction */}
      <div className="mb-4" style={textStyle}>
        <p className="font-bold underline mb-2" style={boldStyle}>9. GOVERNING LAW AND JURISDICTION</p>
        <p style={textStyle}>
          This MNDA and all matters relating hereto are governed by, and construed in accordance with, the laws of the State of <strong style={boldStyle}>{data.governingLaw || '[STATE]'}</strong>, without regard to the conflict of laws provisions of such State. Any legal suit, action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in <strong style={boldStyle}>{data.jurisdiction || '[JURISDICTION]'}</strong>. Each party irrevocably submits to the exclusive jurisdiction of such courts in any such suit, action, or proceeding.
        </p>
      </div>

      {/* Equitable Relief */}
      <div className="mb-4" style={textStyle}>
        <p className="font-bold underline mb-2" style={boldStyle}>10. EQUITABLE RELIEF</p>
        <p style={textStyle}>
          A breach of this MNDA may cause irreparable harm for which monetary damages are an insufficient remedy. Upon a breach of this MNDA, the Disclosing Party is entitled to seek appropriate equitable relief, including an injunction, in addition to its other remedies.
        </p>
      </div>

      {/* General */}
      <div className="mb-4" style={textStyle}>
        <p className="font-bold underline mb-2" style={boldStyle}>11. GENERAL</p>
        <p className="mb-2" style={textStyle}>
          Neither party has an obligation under this MNDA to disclose Confidential Information to the other or proceed with any proposed transaction. Neither party may assign this MNDA without the prior written consent of the other party, except that either party may assign this MNDA in connection with a merger, reorganization, acquisition or other transfer of all or substantially all its assets or voting securities. Any assignment in violation of this Section is null and void. This MNDA will bind and inure to the benefit of each party's permitted successors and assigns. This MNDA (including this Cover Page) constitutes the entire agreement of the parties with respect to its subject matter, and supersedes all prior and contemporaneous understandings, agreements, representations, and warranties, whether written or oral, regarding such subject matter.
        </p>
      </div>

      {/* Signature Block */}
      <div className="mt-8" style={textStyle}>
        <div className="grid grid-cols-1 gap-8" style={textStyle}>
          {/* Party A Signature */}
          <div style={textStyle}>
            <p className="font-bold mb-2" style={boldStyle}>PARTY A:</p>
            <div className="border border-black p-4" style={{ borderColor: '#000000', ...textStyle }}>
              <p className="mb-4" style={textStyle}>{data.partyAName || '[PARTY A NAME]'}</p>
              <div className="border-t border-black pt-2 mt-16" style={{ borderColor: '#000000', ...textStyle }}>
                <p className="mb-1" style={textStyle}>By: _____________________________</p>
                <p className="mb-1" style={textStyle}>Name: ___________________________</p>
                <p className="mb-1" style={textStyle}>Title: ____________________________</p>
                <p className="mb-1" style={textStyle}>Date: ____________________________</p>
              </div>
              <div className="mt-4 text-sm" style={textStyle}>
                <p className="font-bold" style={boldStyle}>Notice Address:</p>
                <p style={textStyle}>{data.partyANoticeAddress || '[NOTICE ADDRESS]'}</p>
              </div>
            </div>
          </div>
          
          {/* Party B Signature */}
          <div style={textStyle}>
            <p className="font-bold mb-2" style={boldStyle}>PARTY B:</p>
            <div className="border border-black p-4" style={{ borderColor: '#000000', ...textStyle }}>
              <p className="mb-4" style={textStyle}>{data.partyBName || '[PARTY B NAME]'}</p>
              <div className="border-t border-black pt-2 mt-16" style={{ borderColor: '#000000', ...textStyle }}>
                <p className="mb-1" style={textStyle}>By: _____________________________</p>
                <p className="mb-1" style={textStyle}>Name: ___________________________</p>
                <p className="mb-1" style={textStyle}>Title: ____________________________</p>
                <p className="mb-1" style={textStyle}>Date: ____________________________</p>
              </div>
              <div className="mt-4 text-sm" style={textStyle}>
                <p className="font-bold" style={boldStyle}>Notice Address:</p>
                <p style={textStyle}>{data.partyBNoticeAddress || '[NOTICE ADDRESS]'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

NDADocument.displayName = 'NDADocument';

export default NDADocument;
