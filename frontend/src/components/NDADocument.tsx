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

  return (
    <div 
      ref={ref}
      className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-4xl mx-auto"
      style={{ fontFamily: 'Times New Roman, serif', fontSize: '11pt', lineHeight: '1.5' }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-lg font-bold underline mb-1">MUTUAL NON-DISCLOSURE AGREEMENT</h1>
        <p className="text-xs">(Also known as a Mutual Confidentiality Agreement)</p>
      </div>

      {/* Introduction */}
      <div className="mb-4">
        <p className="font-bold underline mb-2">1. INTRODUCTION</p>
        <p className="mb-2">
          This Mutual Non-Disclosure Agreement (this "<strong>MNDA</strong>") allows each party ("<strong>Disclosing Party</strong>") to disclose or make available information in connection with the <strong>Purpose</strong> which (1) the Disclosing Party identifies to the receiving party ("<strong>Receiving Party</strong>") as "confidential", "proprietary", or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure ("<strong>Confidential Information</strong>").
        </p>
        <p>
          This MNDA is entered into as of <strong>{formatDate(data.date)}</strong> (the "<strong>Effective Date</strong>"), by and between:
        </p>
        <div className="ml-4 mt-2 mb-2">
          <p className="mb-1"><strong>{data.partyAName || '[PARTY A NAME]'}</strong> ("<strong>Party A</strong>"), with its principal place of business at {data.partyAAddress || '[PARTY A ADDRESS]'};</p>
          <p className="mb-1">and</p>
          <p><strong>{data.partyBName || '[PARTY B NAME]'}</strong> ("<strong>Party B</strong>"), with its principal place of business at {data.partyBAddress || '[PARTY B ADDRESS]'}.</p>
        </div>
        <p>
          Party A and Party B may be referred to individually as a "Party" and collectively as the "Parties."
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-4">
        <p className="font-bold underline mb-2">PURPOSE</p>
        <p>
          The Parties wish to explore a potential business relationship (the "<strong>Purpose</strong>") concerning: <strong>{data.purpose || '[PURPOSE]'}</strong>.
        </p>
      </div>

      {/* Use and Protection of Confidential Information */}
      <div className="mb-4">
        <p className="font-bold underline mb-2">2. USE AND PROTECTION OF CONFIDENTIAL INFORMATION</p>
        <p className="mb-2">The Receiving Party shall:</p>
        <div className="ml-4 mb-2">
          <p>(a) use Confidential Information solely for the <strong>Purpose</strong>;</p>
          <p>(b) not disclose Confidential Information to third parties without the Disclosing Party's prior written approval, except that the Receiving Party may disclose Confidential Information to its employees, agents, advisors, contractors and other representatives having a reasonable need to know for the <strong>Purpose</strong>, provided these representatives are bound by confidentiality obligations no less protective of the Disclosing Party than the applicable terms in this MNDA and the Receiving Party remains responsible for their compliance with this MNDA; and</p>
          <p>(c) protect Confidential Information using at least the same protections the Receiving Party uses for its own similar information but no less than a reasonable standard of care.</p>
        </div>
      </div>

      {/* Exceptions */}
      <div className="mb-4">
        <p className="font-bold underline mb-2">3. EXCEPTIONS</p>
        <p>The Receiving Party's obligations in this MNDA do not apply to information that it can demonstrate:</p>
        <div className="ml-4 mb-2">
          <p>(a) is or becomes publicly available through no fault of the Receiving Party;</p>
          <p>(b) it rightfully knew or possessed prior to receipt from the Disclosing Party without confidentiality restrictions;</p>
          <p>(c) it rightfully obtained from a third party without confidentiality restrictions; or</p>
          <p>(d) it independently developed without using or referencing the Confidential Information.</p>
        </div>
      </div>

      {/* Disclosures Required by Law */}
      <div className="mb-4">
        <p className="font-bold underline mb-2">4. DISCLOSURES REQUIRED BY LAW</p>
        <p>
          The Receiving Party may disclose Confidential Information to the extent required by law, regulation or regulatory authority, subpoena or court order, provided (to the extent legally permitted) it provides the Disclosing Party reasonable advance notice of the required disclosure and reasonably cooperates, at the Disclosing Party's expense, with the Disclosing Party's efforts to obtain confidential treatment for the Confidential Information.
        </p>
      </div>

      {/* Term and Termination */}
      <div className="mb-4">
        <p className="font-bold underline mb-2">5. TERM AND TERMINATION</p>
        <p className="mb-2">
          This MNDA commences on the <strong>Effective Date</strong> and expires at the end of <strong>{getMNATermText()}</strong> from the Effective Date, unless earlier terminated as provided below.
        </p>
        <p className="mb-2">
          Either party may terminate this MNDA for any or no reason upon written notice to the other party. 
        </p>
        <p>
          The Receiving Party's obligations relating to Confidential Information will survive for <strong>{getConfidentialityTermText()}</strong> from the Effective Date, despite any expiration or termination of this MNDA.
        </p>
      </div>

      {/* Return or Destruction of Confidential Information */}
      <div className="mb-4">
        <p className="font-bold underline mb-2">6. RETURN OR DESTRUCTION OF CONFIDENTIAL INFORMATION</p>
        <p className="mb-2">
          Upon expiration or termination of this MNDA or upon the Disclosing Party's earlier request, the Receiving Party will:
        </p>
        <div className="ml-4 mb-2">
          <p>(a) cease using Confidential Information;</p>
          <p>(b) promptly after the Disclosing Party's written request, destroy all Confidential Information in the Receiving Party's possession or control or return it to the Disclosing Party; and</p>
          <p>(c) if requested by the Disclosing Party, confirm its compliance with these obligations in writing.</p>
        </div>
        <p>
          As an exception to subsection (b), the Receiving Party may retain Confidential Information in accordance with its standard backup or record retention policies or as required by law, but the terms of this MNDA will continue to apply to the retained Confidential Information.
        </p>
      </div>

      {/* Proprietary Rights */}
      <div className="mb-4">
        <p className="font-bold underline mb-2">7. PROPRIETARY RIGHTS</p>
        <p>
          Each Party retains all of its intellectual property and other rights in its Confidential Information and its disclosure to the Receiving Party grants no license under such rights.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mb-4">
        <p className="font-bold underline mb-2">8. DISCLAIMER</p>
        <p>
          ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS", WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
        </p>
      </div>

      {/* Governing Law and Jurisdiction */}
      <div className="mb-4">
        <p className="font-bold underline mb-2">9. GOVERNING LAW AND JURISDICTION</p>
        <p>
          This MNDA and all matters relating hereto are governed by, and construed in accordance with, the laws of the State of <strong>{data.governingLaw || '[STATE]'}</strong>, without regard to the conflict of laws provisions of such State. Any legal suit, action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in <strong>{data.jurisdiction || '[JURISDICTION]'}</strong>. Each party irrevocably submits to the exclusive jurisdiction of such courts in any such suit, action, or proceeding.
        </p>
      </div>

      {/* Equitable Relief */}
      <div className="mb-4">
        <p className="font-bold underline mb-2">10. EQUITABLE RELIEF</p>
        <p>
          A breach of this MNDA may cause irreparable harm for which monetary damages are an insufficient remedy. Upon a breach of this MNDA, the Disclosing Party is entitled to seek appropriate equitable relief, including an injunction, in addition to its other remedies.
        </p>
      </div>

      {/* General */}
      <div className="mb-4">
        <p className="font-bold underline mb-2">11. GENERAL</p>
        <p className="mb-2">
          Neither party has an obligation under this MNDA to disclose Confidential Information to the other or proceed with any proposed transaction. Neither party may assign this MNDA without the prior written consent of the other party, except that either party may assign this MNDA in connection with a merger, reorganization, acquisition or other transfer of all or substantially all its assets or voting securities. Any assignment in violation of this Section is null and void. This MNDA will bind and inure to the benefit of each party's permitted successors and assigns. This MNDA (including this Cover Page) constitutes the entire agreement of the parties with respect to its subject matter, and supersedes all prior and contemporaneous understandings, agreements, representations, and warranties, whether written or oral, regarding such subject matter.
        </p>
      </div>

      {/* Signature Block */}
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Party A Signature */}
          <div>
            <p className="font-bold mb-2">PARTY A:</p>
            <div className="border border-black p-4">
              <p className="mb-4">{data.partyAName || '[PARTY A NAME]'}</p>
              <div className="border-t border-black pt-2 mt-16">
                <p className="mb-1">By: _____________________________</p>
                <p className="mb-1">Name: ___________________________</p>
                <p className="mb-1">Title: ____________________________</p>
                <p className="mb-1">Date: ____________________________</p>
              </div>
              <div className="mt-4 text-sm">
                <p className="font-bold">Notice Address:</p>
                <p>{data.partyANoticeAddress || '[NOTICE ADDRESS]'}</p>
              </div>
            </div>
          </div>
          
          {/* Party B Signature */}
          <div>
            <p className="font-bold mb-2">PARTY B:</p>
            <div className="border border-black p-4">
              <p className="mb-4">{data.partyBName || '[PARTY B NAME]'}</p>
              <div className="border-t border-black pt-2 mt-16">
                <p className="mb-1">By: _____________________________</p>
                <p className="mb-1">Name: ___________________________</p>
                <p className="mb-1">Title: ____________________________</p>
                <p className="mb-1">Date: ____________________________</p>
              </div>
              <div className="mt-4 text-sm">
                <p className="font-bold">Notice Address:</p>
                <p>{data.partyBNoticeAddress || '[NOTICE ADDRESS]'}</p>
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
