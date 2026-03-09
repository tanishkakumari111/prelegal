'use client';

import React from 'react';

export interface NDAData {
  partyAName: string;
  partyAAddress: string;
  partyANoticeAddress: string;
  partyBName: string;
  partyBAddress: string;
  partyBNoticeAddress: string;
  date: string;
  effectiveDate: string;
  purpose: string;
  governingLaw: string;
  jurisdiction: string;
  mndTerm: string;
  confidentialityTerm: string;
}

interface NDAFormProps {
  data: NDAData;
  onChange: (data: NDAData) => void;
}

const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black";

export default function NDAForm({ data, onChange }: NDAFormProps) {
  const handleChange = (field: keyof NDAData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-black">Mutual NDA Information</h2>
      <p className="text-sm text-gray-600 mb-6">Fill in the details below to generate your Mutual Non-Disclosure Agreement based on CommonPaper template.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Party A Information */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-black mb-3 border-b pb-2">Party A</h3>
        </div>
        
        <div>
          <label htmlFor="partyAName" className="block text-sm font-medium text-black mb-1">
            Company Name *
          </label>
          <input
            type="text"
            id="partyAName"
            value={data.partyAName}
            onChange={(e) => handleChange('partyAName', e.target.value)}
            required
            className={inputClasses}
            placeholder="ABC Corporation"
          />
        </div>
        
        <div>
          <label htmlFor="partyAAddress" className="block text-sm font-medium text-black mb-1">
            Principal Address *
          </label>
          <input
            type="text"
            id="partyAAddress"
            value={data.partyAAddress}
            onChange={(e) => handleChange('partyAAddress', e.target.value)}
            required
            className={inputClasses}
            placeholder="123 Business St, Suite 100, City, State 12345"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="partyANoticeAddress" className="block text-sm font-medium text-black mb-1">
            Notice Address (for legal notices) *
          </label>
          <input
            type="text"
            id="partyANoticeAddress"
            value={data.partyANoticeAddress}
            onChange={(e) => handleChange('partyANoticeAddress', e.target.value)}
            required
            className={inputClasses}
            placeholder="notice@abccorp.com or 123 Business St, Suite 100, City, State 12345"
          />
        </div>

        {/* Party B Information */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-black mb-3 border-b pb-2 mt-4">Party B</h3>
        </div>
        
        <div>
          <label htmlFor="partyBName" className="block text-sm font-medium text-black mb-1">
            Company Name *
          </label>
          <input
            type="text"
            id="partyBName"
            value={data.partyBName}
            onChange={(e) => handleChange('partyBName', e.target.value)}
            required
            className={inputClasses}
            placeholder="XYZ Industries"
          />
        </div>
        
        <div>
          <label htmlFor="partyBAddress" className="block text-sm font-medium text-black mb-1">
            Principal Address *
          </label>
          <input
            type="text"
            id="partyBAddress"
            value={data.partyBAddress}
            onChange={(e) => handleChange('partyBAddress', e.target.value)}
            required
            className={inputClasses}
            placeholder="456 Corporate Ave, City, State 67890"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="partyBNoticeAddress" className="block text-sm font-medium text-black mb-1">
            Notice Address (for legal notices) *
          </label>
          <input
            type="text"
            id="partyBNoticeAddress"
            value={data.partyBNoticeAddress}
            onChange={(e) => handleChange('partyBNoticeAddress', e.target.value)}
            required
            className={inputClasses}
            placeholder="notice@xyzindustries.com or 456 Corporate Ave, City, State 67890"
          />
        </div>

        {/* Dates */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-black mb-3 border-b pb-2 mt-4">Agreement Dates</h3>
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-black mb-1">
            Agreement Date *
          </label>
          <input
            type="date"
            id="date"
            value={data.date}
            onChange={(e) => handleChange('date', e.target.value)}
            required
            className={inputClasses}
          />
        </div>
        
        <div>
          <label htmlFor="effectiveDate" className="block text-sm font-medium text-black mb-1">
            Effective Date *
          </label>
          <input
            type="date"
            id="effectiveDate"
            value={data.effectiveDate}
            onChange={(e) => handleChange('effectiveDate', e.target.value)}
            required
            className={inputClasses}
          />
        </div>

        {/* Purpose */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-black mb-3 border-b pb-2 mt-4">Purpose</h3>
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="purpose" className="block text-sm font-medium text-black mb-1">
            Purpose of Disclosure *
          </label>
          <textarea
            id="purpose"
            value={data.purpose}
            onChange={(e) => handleChange('purpose', e.target.value)}
            required
            rows={3}
            className={inputClasses}
            placeholder="Describe the business purpose for which the confidential information will be shared..."
          />
        </div>

        {/* Term */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-black mb-3 border-b pb-2 mt-4">Agreement Term</h3>
        </div>
        
        <div>
          <label htmlFor="mndTerm" className="block text-sm font-medium text-black mb-1">
            MNDA Term *
          </label>
          <select
            id="mndTerm"
            value={data.mndTerm}
            onChange={(e) => handleChange('mndTerm', e.target.value)}
            required
            className={inputClasses}
          >
            <option value="1year">Expires 1 year from Effective Date</option>
            <option value="2years">Expires 2 years from Effective Date</option>
            <option value="3years">Expires 3 years from Effective Date</option>
            <option value="perpetual">Continues until terminated</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="confidentialityTerm" className="block text-sm font-medium text-black mb-1">
            Term of Confidentiality *
          </label>
          <select
            id="confidentialityTerm"
            value={data.confidentialityTerm}
            onChange={(e) => handleChange('confidentialityTerm', e.target.value)}
            required
            className={inputClasses}
          >
            <option value="1year">1 year from Effective Date</option>
            <option value="2years">2 years from Effective Date</option>
            <option value="3years">3 years from Effective Date</option>
            <option value="perpetual">In perpetuity (for trade secrets)</option>
          </select>
        </div>

        {/* Governing Law & Jurisdiction */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-black mb-3 border-b pb-2 mt-4">Governing Law & Jurisdiction</h3>
        </div>
        
        <div>
          <label htmlFor="governingLaw" className="block text-sm font-medium text-black mb-1">
            Governing Law (State) *
          </label>
          <input
            type="text"
            id="governingLaw"
            value={data.governingLaw}
            onChange={(e) => handleChange('governingLaw', e.target.value)}
            required
            className={inputClasses}
            placeholder="Delaware"
          />
        </div>
        
        <div>
          <label htmlFor="jurisdiction" className="block text-sm font-medium text-black mb-1">
            Jurisdiction (Courts) *
          </label>
          <input
            type="text"
            id="jurisdiction"
            value={data.jurisdiction}
            onChange={(e) => handleChange('jurisdiction', e.target.value)}
            required
            className={inputClasses}
            placeholder="courts located in New Castle, DE"
          />
        </div>
      </div>
    </div>
  );
}
