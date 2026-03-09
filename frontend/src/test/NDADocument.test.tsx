import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NDADocument from '../../components/NDADocument';
import { NDAData } from '../../components/NDAForm';

describe('NDADocument', () => {
  const defaultData: NDAData = {
    partyAName: 'Company A',
    partyAAddress: '123 A Street',
    partyANoticeAddress: 'notice@a.com',
    partyBName: 'Company B',
    partyBAddress: '456 B Avenue',
    partyBNoticeAddress: 'notice@b.com',
    date: '2024-01-01',
    effectiveDate: '2024-01-01',
    purpose: 'Testing business relationship',
    governingLaw: 'Delaware',
    jurisdiction: 'New Castle, Delaware',
    mndTerm: '1year',
    confidentialityTerm: '1year',
  };

  describe('Document Rendering', () => {
    it('renders the document title', () => {
      render(<NDADocument data={defaultData} />);
      
      expect(screen.getByText('MUTUAL NON-DISCLOSURE AGREEMENT')).toBeInTheDocument();
    });

    it('renders all 11 sections', () => {
      render(<NDADocument data={defaultData} />);
      
      expect(screen.getByText(/1. INTRODUCTION/)).toBeInTheDocument();
      expect(screen.getByText(/PURPOSE/)).toBeInTheDocument();
      expect(screen.getByText(/2. USE AND PROTECTION/)).toBeInTheDocument();
      expect(screen.getByText(/3. EXCEPTIONS/)).toBeInTheDocument();
      expect(screen.getByText(/4. DISCLOSURES REQUIRED BY LAW/)).toBeInTheDocument();
      expect(screen.getByText(/5. TERM AND TERMINATION/)).toBeInTheDocument();
      expect(screen.getByText(/6. RETURN OR DESTRUCTION/)).toBeInTheDocument();
      expect(screen.getByText(/7. PROPRIETARY RIGHTS/)).toBeInTheDocument();
      expect(screen.getByText(/8. DISCLAIMER/)).toBeInTheDocument();
      expect(screen.getByText(/9. GOVERNING LAW/)).toBeInTheDocument();
      expect(screen.getByText(/10. EQUITABLE RELIEF/)).toBeInTheDocument();
      expect(screen.getByText(/11. GENERAL/)).toBeInTheDocument();
    });

    it('renders party names correctly', () => {
      render(<NDADocument data={defaultData} />);
      
      expect(screen.getByText('Company A')).toBeInTheDocument();
      expect(screen.getByText('Company B')).toBeInTheDocument();
    });

    it('renders signature blocks for both parties', () => {
      render(<NDADocument data={defaultData} />);
      
      expect(screen.getByText(/PARTY A:/)).toBeInTheDocument();
      expect(screen.getByText(/PARTY B:/)).toBeInTheDocument();
    });
  });

  describe('Date Formatting', () => {
    it('formats date correctly', () => {
      render(<NDADocument data={defaultData} />);
      
      // Date should be formatted as "January 1, 2024"
      expect(screen.getByText(/January/)).toBeInTheDocument();
    });

    it('handles empty date', () => {
      const emptyData = { ...defaultData, date: '' };
      render(<NDADocument data={emptyData} />);
      
      // Should render without error
      expect(screen.getByText('MUTUAL NON-DISCLOSURE AGREEMENT')).toBeInTheDocument();
    });
  });

  describe('Term Text Generation', () => {
    it('shows 1 year term correctly', () => {
      render(<NDADocument data={defaultData} />);
      
      expect(screen.getByText(/1 year/)).toBeInTheDocument();
    });

    it('shows 2 years term correctly', () => {
      const twoYearData = { ...defaultData, mndTerm: '2years' };
      render(<NDADocument data={twoYearData} />);
      
      expect(screen.getByText(/2 years/)).toBeInTheDocument();
    });

    it('shows 3 years term correctly', () => {
      const threeYearData = { ...defaultData, mndTerm: '3years' };
      render(<NDADocument data={threeYearData} />);
      
      expect(screen.getByText(/3 years/)).toBeInTheDocument();
    });

    it('shows perpetual term correctly', () => {
      const perpetualData = { ...defaultData, mndTerm: 'perpetual', confidentialityTerm: 'perpetual' };
      render(<NDADocument data={perpetualData} />);
      
      expect(screen.getByText(/until terminated/)).toBeInTheDocument();
      expect(screen.getByText(/in perpetuity/)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty party names', () => {
      const emptyData = { ...defaultData, partyAName: '', partyBName: '' };
      render(<NDADocument data={emptyData} />);
      
      // Should render placeholder text
      expect(screen.getByText(/\[PARTY A NAME\]/)).toBeInTheDocument();
      expect(screen.getByText(/\[PARTY B NAME\]/)).toBeInTheDocument();
    });

    it('handles very long purpose text', () => {
      const longPurpose = { ...defaultData, purpose: 'A'.repeat(500) };
      render(<NDADocument data={longPurpose} />);
      
      // Should render without error
      expect(screen.getByText(/PURPOSE/)).toBeInTheDocument();
    });

    it('handles special characters in party names', () => {
      const specialData = { 
        ...defaultData, 
        partyAName: 'Company & Sons "Inc." <test@example.com>',
        partyBName: 'Test & Co.\'s LLC'
      };
      render(<NDADocument data={specialData} />);
      
      expect(screen.getByText(/Company & Sons/)).toBeInTheDocument();
      expect(screen.getByText(/Test & Co./)).toBeInTheDocument();
    });

    it('handles unicode characters', () => {
      const unicodeData = { 
        ...defaultData, 
        partyAName: '测试公司 🏢',
        partyBName: 'Société à responsabilité limitée'
      };
      render(<NDADocument data={unicodeData} />);
      
      expect(screen.getByText(/测试公司/)).toBeInTheDocument();
      expect(screen.getByText(/Société/)).toBeInTheDocument();
    });

    it('renders notice addresses correctly', () => {
      render(<NDADocument data={defaultData} />);
      
      expect(screen.getByText(/Notice Address:/)).toBeInTheDocument();
    });

    it('renders governing law and jurisdiction', () => {
      render(<NDADocument data={defaultData} />);
      
      expect(screen.getByText(/State of Delaware/)).toBeInTheDocument();
      expect(screen.getByText(/New Castle, Delaware/)).toBeInTheDocument();
    });
  });
});
