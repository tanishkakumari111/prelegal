'use client';

import React from 'react';

export interface NDAData {
  partyAName: string;
  partyAAddress: string;
  partyBName: string;
  partyBAddress: string;
  date: string;
  effectiveDate: string;
  purpose: string;
  jurisdiction: string;
  state: string;
}

interface NDAFormProps {
  data: NDAData;
  onChange: (data: NDAData) => void;
}

export default function NDAForm({ data, onChange }: NDAFormProps) {
  const handleChange = (field: keyof NDAData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Mutual NDA Information</h2>
      <p className="text-sm text-gray-500 mb-6">Fill in the details below to generate your Mutual Non-Disclosure Agreement.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Party A Information */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">Party A (Disclosing Party)</h3>
        </div>
        
        <div>
          <label htmlFor="partyAName" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name *
          </label>
          <input
            type="text"
            id="partyAName"
            value={data.partyAName}
            onChange={(e) => handleChange('partyAName', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ABC Corporation"
          />
        </div>
        
        <div>
          <label htmlFor="partyAAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <input
            type="text"
            id="partyAAddress"
            value={data.partyAAddress}
            onChange={(e) => handleChange('partyAAddress', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="123 Business St, Suite 100, City, State 12345"
          />
        </div>

        {/* Party B Information */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2 mt-4">Party B (Receiving Party)</h3>
        </div>
        
        <div>
          <label htmlFor="partyBName" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name *
          </label>
          <input
            type="text"
            id="partyBName"
            value={data.partyBName}
            onChange={(e) => handleChange('partyBName', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="XYZ Industries"
          />
        </div>
        
        <div>
          <label htmlFor="partyBAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <input
            type="text"
            id="partyBAddress"
            value={data.partyBAddress}
            onChange={(e) => handleChange('partyBAddress', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="456 Corporate Ave, City, State 67890"
          />
        </div>

        {/* Dates */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2 mt-4">Agreement Dates</h3>
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Agreement Date *
          </label>
          <input
            type="date"
            id="date"
            value={data.date}
            onChange={(e) => handleChange('date', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="effectiveDate" className="block text-sm font-medium text-gray-700 mb-1">
            Effective Date *
          </label>
          <input
            type="date"
            id="effectiveDate"
            value={data.effectiveDate}
            onChange={(e) => handleChange('effectiveDate', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Purpose and Jurisdiction */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2 mt-4">Additional Details</h3>
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
            Purpose of Disclosure *
          </label>
          <textarea
            id="purpose"
            value={data.purpose}
            onChange={(e) => handleChange('purpose', e.target.value)}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the business purpose for which the confidential information will be shared..."
          />
        </div>
        
        <div>
          <label htmlFor="jurisdiction" className="block text-sm font-medium text-gray-700 mb-1">
            Jurisdiction/State *
          </label>
          <input
            type="text"
            id="jurisdiction"
            value={data.jurisdiction}
            onChange={(e) => handleChange('jurisdiction', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="California"
          />
        </div>
        
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            Governing State *
          </label>
          <input
            type="text"
            id="state"
            value={data.state}
            onChange={(e) => handleChange('state', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Delaware"
          />
        </div>
      </div>
    </div>
  );
}
