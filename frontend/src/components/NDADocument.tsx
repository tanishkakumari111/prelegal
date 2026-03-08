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

  return (
    <div 
      ref={ref}
      className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-4xl mx-auto"
      style={{ fontFamily: 'Times New Roman, serif', fontSize: '12pt', lineHeight: '1.6' }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold underline mb-2">MUTUAL NON-DISCLOSURE AGREEMENT</h1>
        <p className="text-sm">(Also known as a Mutual Confidentiality Agreement)</p>
      </div>

      {/* Preamble */}
      <div className="mb-6">
        <p className="mb-4">
          This Mutual Non-Disclosure Agreement (the &quot;Agreement&quot;) is entered into as of{' '}
          <strong>{formatDate(data.date)}</strong> (the &quot;Effective Date&quot;), by and between:
        </p>
        
        <div className="ml-4 mb-4">
          <p className="mb-1"><strong>{data.partyAName || '[PARTY A NAME]'}</strong>, a corporation organized and existing under the laws of {data.jurisdiction || '[JURISDICTION]'}, with its principal place of business at {data.partyAAddress || '[PARTY A ADDRESS]'} (&quot;Party A&quot;); and</p>
          
          <p className="mt-4"><strong>{data.partyBName || '[PARTY B NAME]'}</strong>, a corporation organized and existing under the laws of {data.jurisdiction || '[JURISDICTION]'}, with its principal place of business at {data.partyBAddress || '[PARTY B ADDRESS]'} (&quot;Party B&quot;).</p>
        </div>
        
        <p>
          Party A and Party B may be referred to individually as a &quot;Party&quot; and collectively as the &quot;Parties.&quot;
        </p>
      </div>

      {/* Recitals */}
      <div className="mb-6">
        <p className="font-bold mb-2">WITNESSETH:</p>
        <p>
          WHEREAS, the Parties wish to explore a potential business relationship (the &quot;Purpose&quot;) 
          {data.purpose && (
            <> concerning: <strong>{data.purpose}</strong></>
          )}; and
        </p>
        <p className="mt-2">
          WHEREAS, in connection with the Purpose, each Party may disclose to the other certain 
          confidential and proprietary information that each Party desires to protect from unauthorized 
          disclosure and use.
        </p>
      </div>

      {/* Definitions */}
      <div className="mb-6">
        <p className="font-bold underline mb-2">1. DEFINITIONS</p>
        <p className="mb-2">
          1.1 &quot;Confidential Information&quot; means any and all information or data, whether written, 
          oral, electronic, visual, or in any other form, disclosed by either Party (the &quot;Disclosing Party&quot;) 
          to the other Party (the &quot;Receiving Party&quot;), including but not limited to:
        </p>
        <div className="ml-8 mb-2">
          <p>(a) trade secrets, inventions, ideas, processes, formulas, source and object codes, data, programs, and other technical information;</p>
          <p>(b) business and marketing plans, strategies, and financial information;</p>
          <p>(c) customer and supplier lists and information;</p>
          <p>(d) personnel information;</p>
          <p>(e) any other information designated as confidential or that reasonably should be understood to be confidential.</p>
        </div>
        <p>
          1.2 Confidential Information shall not include information that: (a) is or becomes publicly available without breach of this Agreement; (b) was known to the Receiving Party prior to disclosure; (c) is independently developed by the Receiving Party; or (d) is rightfully obtained from third parties without restriction.
        </p>
      </div>

      {/* Obligations */}
      <div className="mb-6">
        <p className="font-bold underline mb-2">2. OBLIGATIONS OF RECEIVING PARTY</p>
        <p className="mb-2">
          2.1 The Receiving Party shall:
        </p>
        <div className="ml-8 mb-2">
          <p>(a) hold all Confidential Information in strict confidence and not disclose such information to any third party without the prior written consent of the Disclosing Party;</p>
          <p>(b) use the Confidential Information solely for the Purpose;</p>
          <p>(c) protect the Confidential Information using at least the same degree of care it uses to protect its own confidential information, but in no event less than reasonable care;</p>
          <p>(d) limit access to Confidential Information to those employees, agents, and contractors who have a need to know and who have agreed to be bound by confidentiality obligations at least as restrictive as those contained herein.</p>
        </div>
        <p>
          2.2 Upon termination of this Agreement or upon request by the Disclosing Party, the Receiving Party shall promptly return or destroy all Confidential Information and any copies thereof.
        </p>
      </div>

      {/* Term */}
      <div className="mb-6">
        <p className="font-bold underline mb-2">3. TERM</p>
        <p>
          This Agreement shall commence on the Effective Date and shall continue for a period of three (3) years, unless earlier terminated by either Party upon thirty (30) days prior written notice to the other Party. The obligations of confidentiality shall survive termination of this Agreement for a period of five (5) years.
        </p>
      </div>

      {/* Ownership */}
      <div className="mb-6">
        <p className="font-bold underline mb-2">4. OWNERSHIP</p>
        <p>
          Each Party retains all right, title, and interest in and to its Confidential Information. Nothing in this Agreement shall be construed as granting any license or other rights to any Confidential Information, patents, copyrights, trademarks, or other intellectual property rights.
        </p>
      </div>

      {/* Remedies */}
      <div className="mb-6">
        <p className="font-bold underline mb-2">5. REMEDIES</p>
        <p>
          Each Party acknowledges that any breach of this Agreement may cause irreparable harm to the other Party for which monetary damages may be inadequate. Accordingly, the non-breaching Party shall be entitled to seek equitable relief, including injunction and specific performance, in addition to all other remedies available at law or in equity.
        </p>
      </div>

      {/* Governing Law */}
      <div className="mb-6">
        <p className="font-bold underline mb-2">6. GOVERNING LAW</p>
        <p>
          This Agreement shall be governed by and construed in accordance with the laws of the State of {data.state || '[STATE]'}, without regard to its conflicts of law principles.
        </p>
      </div>

      {/* Entire Agreement */}
      <div className="mb-6">
        <p className="font-bold underline mb-2">7. ENTIRE AGREEMENT</p>
        <p>
          This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior negotiations, representations, or agreements relating thereto. This Agreement may only be amended in writing signed by both Parties.
        </p>
      </div>

      {/* Severability */}
      <div className="mb-6">
        <p className="font-bold underline mb-2">8. SEVERABILITY</p>
        <p>
          If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
        </p>
      </div>

      {/* Signature Block */}
      <div className="mt-12">
        <div className="grid grid-cols-2 gap-8">
          {/* Party A Signature */}
          <div>
            <p className="font-bold underline mb-2">IN WITNESS WHEREOF,</p>
            <p className="mb-4">Party A has executed this Agreement as of the date first written above.</p>
            <div className="border-t border-black pt-2 mt-16">
              <p className="mb-1">By: _____________________________</p>
              <p className="mb-1">Name: ___________________________</p>
              <p className="mb-1">Title: ____________________________</p>
              <p>Date: ____________________________</p>
            </div>
          </div>
          
          {/* Party B Signature */}
          <div>
            <p className="font-bold underline mb-2">IN WITNESS WHEREOF,</p>
            <p className="mb-4">Party B has executed this Agreement as of the date first written above.</p>
            <div className="border-t border-black pt-2 mt-16">
              <p className="mb-1">By: _____________________________</p>
              <p className="mb-1">Name: ___________________________</p>
              <p className="mb-1">Title: ____________________________</p>
              <p>Date: ____________________________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

NDADocument.displayName = 'NDADocument';

export default NDADocument;
