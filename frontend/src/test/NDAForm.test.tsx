import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NDAForm from '../../components/NDAForm';
import { NDAData } from '../../components/NDAForm';

describe('NDAForm', () => {
  const mockOnChange = vi.fn();
  
  const defaultProps = {
    data: {
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
    } as NDAData,
    onChange: mockOnChange,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('Form Rendering', () => {
    it('renders all required form fields', () => {
      render(<NDAForm {...defaultProps} />);
      
      expect(screen.getByLabelText(/Company Name \*/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Principal Address \*/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Notice Address/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Agreement Date \*/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Effective Date \*/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Purpose of Disclosure/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Governing Law/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Jurisdiction/)).toBeInTheDocument();
    });

    it('renders Party A and Party B sections', () => {
      render(<NDAForm {...defaultProps} />);
      
      expect(screen.getByText('Party A')).toBeInTheDocument();
      expect(screen.getByText('Party B')).toBeInTheDocument();
    });

    it('renders term selection dropdowns', () => {
      render(<NDAForm {...defaultProps} />);
      
      expect(screen.getByLabelText(/MNDA Term/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Term of Confidentiality/)).toBeInTheDocument();
    });
  });

  describe('Form Input Handling', () => {
    it('calls onChange when Party A name is entered', () => {
      render(<NDAForm {...defaultProps} />);
      
      const partyANameInput = screen.getByLabelText(/Company Name \*/);
      fireEvent.change(partyANameInput, { target: { value: 'Test Company' } });
      
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          partyAName: 'Test Company',
        })
      );
    });

    it('calls onChange when Party A address is entered', () => {
      render(<NDAForm {...defaultProps} />);
      
      const partyAAddressInput = screen.getByLabelText(/Principal Address \*/);
      fireEvent.change(partyAAddressInput, { target: { value: '123 Test St' } });
      
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          partyAAddress: '123 Test St',
        })
      );
    });

    it('calls onChange when purpose is entered', () => {
      render(<NDAForm {...defaultProps} />);
      
      const purposeTextarea = screen.getByLabelText(/Purpose of Disclosure/);
      fireEvent.change(purposeTextarea, { target: { value: 'Testing purposes' } });
      
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          purpose: 'Testing purposes',
        })
      );
    });

    it('calls onChange when jurisdiction is entered', () => {
      render(<NDAForm {...defaultProps} />);
      
      const jurisdictionInput = screen.getByLabelText(/Jurisdiction/);
      fireEvent.change(jurisdictionInput, { target: { value: 'Delaware' } });
      
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          jurisdiction: 'Delaware',
        })
      );
    });

    it('calls onChange when governing law is entered', () => {
      render(<NDAForm {...defaultProps} />);
      
      const governingLawInput = screen.getByLabelText(/Governing Law/);
      fireEvent.change(governingLawInput, { target: { value: 'California' } });
      
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          governingLaw: 'California',
        })
      );
    });
  });

  describe('Term Selection', () => {
    it('renders all MNDA term options', () => {
      render(<NDAForm {...defaultProps} />);
      
      const mndTermSelect = screen.getByLabelText(/MNDA Term/);
      const options = mndTermSelect.querySelectorAll('option');
      
      expect(options.length).toBe(4);
      expect(options[0].textContent).toContain('1 year');
      expect(options[1].textContent).toContain('2 years');
      expect(options[2].textContent).toContain('3 years');
      expect(options[3].textContent).toContain('terminated');
    });

    it('calls onChange when MNDA term is changed', () => {
      render(<NDAForm {...defaultProps} />);
      
      const mndTermSelect = screen.getByLabelText(/MNDA Term/);
      fireEvent.change(mndTermSelect, { target: { value: '2years' } });
      
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          mndTerm: '2years',
        })
      );
    });

    it('calls onChange when confidentiality term is changed', () => {
      render(<NDAForm {...defaultProps} />);
      
      const confidentialitySelect = screen.getByLabelText(/Term of Confidentiality/);
      fireEvent.change(confidentialitySelect, { target: { value: 'perpetual' } });
      
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          confidentialityTerm: 'perpetual',
        })
      );
    });
  });

  describe('Edge Cases', () => {
    it('handles long text input without crashing', () => {
      render(<NDAForm {...defaultProps} />);
      
      const longText = 'A'.repeat(1000);
      const partyANameInput = screen.getByLabelText(/Company Name \*/);
      
      expect(() => {
        fireEvent.change(partyANameInput, { target: { value: longText } });
      }).not.toThrow();
    });

    it('handles special characters in input', () => {
      render(<NDAForm {...defaultProps} />);
      
      const specialChars = 'Company & Co. "Inc." <test@example.com>';
      const partyANameInput = screen.getByLabelText(/Company Name \*/);
      
      expect(() => {
        fireEvent.change(partyANameInput, { target: { value: specialChars } });
      }).not.toThrow();
    });

    it('handles unicode characters in input', () => {
      render(<NDAForm {...defaultProps} />);
      
      const unicodeText = '公司名称 🏢 测试';
      const partyANameInput = screen.getByLabelText(/Company Name \*/);
      
      expect(() => {
        fireEvent.change(partyANameInput, { target: { value: unicodeText } });
      }).not.toThrow();
    });

    it('handles empty optional fields', () => {
      render(<NDAForm {...defaultProps} />);
      
      // Should render without errors even with empty data
      expect(screen.getByText('Mutual NDA Information')).toBeInTheDocument();
    });

    it('handles date input correctly', () => {
      render(<NDAForm {...defaultProps} />);
      
      const dateInput = screen.getByLabelText(/Agreement Date/);
      fireEvent.change(dateInput, { target: { value: '2024-01-15' } });
      
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          date: '2024-01-15',
        })
      );
    });
  });
});
