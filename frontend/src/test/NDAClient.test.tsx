import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NDAClient from '../../components/NDAClient';

describe('NDAClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders the header correctly', () => {
      render(<NDAClient />);
      
      expect(screen.getByText('Mutual NDA Creator')).toBeInTheDocument();
      expect(screen.getByText(/Create a professionally drafted/)).toBeInTheDocument();
    });

    it('renders the Generate NDA Document button', () => {
      render(<NDAClient />);
      
      const generateButton = screen.getByText('Generate NDA Document');
      expect(generateButton).toBeInTheDocument();
    });

    it('renders the form with all required fields', () => {
      render(<NDAClient />);
      
      expect(screen.getByLabelText(/Company Name \*/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Principal Address \*/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Notice Address/)).toBeInTheDocument();
    });

    it('renders footer disclaimer', () => {
      render(<NDAClient />);
      
      expect(screen.getByText(/prototype for demonstration purposes/)).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('Generate button is disabled when form is empty', () => {
      render(<NDAClient />);
      
      const generateButton = screen.getByText('Generate NDA Document');
      expect(generateButton).toBeDisabled();
    });

    it('shows validation message when form is invalid', async () => {
      render(<NDAClient />);
      
      const generateButton = screen.getByText('Generate NDA Document');
      fireEvent.click(generateButton);
      
      await waitFor(() => {
        expect(screen.getByText('Please fill in all required fields')).toBeInTheDocument();
      });
    });

    it('button becomes enabled when all required fields are filled', async () => {
      render(<NDAClient />);
      
      // Fill in all required fields
      fireEvent.change(screen.getByLabelText(/Party A.*Company Name/), { target: { value: 'Company A' } });
      fireEvent.change(screen.getByLabelText(/Party A.*Principal Address/), { target: { value: '123 A St' } });
      fireEvent.change(screen.getByLabelText(/Party A.*Notice Address/), { target: { value: 'notice@a.com' } });
      fireEvent.change(screen.getByLabelText(/Party B.*Company Name/), { target: { value: 'Company B' } });
      fireEvent.change(screen.getByLabelText(/Party B.*Principal Address/), { target: { value: '456 B Ave' } });
      fireEvent.change(screen.getByLabelText(/Party B.*Notice Address/), { target: { value: 'notice@b.com' } });
      fireEvent.change(screen.getByLabelText(/Agreement Date/), { target: { value: '2024-01-01' } });
      fireEvent.change(screen.getByLabelText(/Effective Date/), { target: { value: '2024-01-01' } });
      fireEvent.change(screen.getByLabelText(/Purpose of Disclosure/), { target: { value: 'Testing' } });
      fireEvent.change(screen.getByLabelText(/Governing Law/), { target: { value: 'Delaware' } });
      fireEvent.change(screen.getByLabelText(/Jurisdiction/), { target: { value: 'Delaware' } });
      
      const generateButton = screen.getByText('Generate NDA Document');
      expect(generateButton).not.toBeDisabled();
    });

    it('shows NDA document after successful generation', async () => {
      render(<NDAClient />);
      
      // Fill in all required fields
      fireEvent.change(screen.getByLabelText(/Party A.*Company Name/), { target: { value: 'Company A' } });
      fireEvent.change(screen.getByLabelText(/Party A.*Principal Address/), { target: { value: '123 A St' } });
      fireEvent.change(screen.getByLabelText(/Party A.*Notice Address/), { target: { value: 'notice@a.com' } });
      fireEvent.change(screen.getByLabelText(/Party B.*Company Name/), { target: { value: 'Company B' } });
      fireEvent.change(screen.getByLabelText(/Party B.*Principal Address/), { target: { value: '456 B Ave' } });
      fireEvent.change(screen.getByLabelText(/Party B.*Notice Address/), { target: { value: 'notice@b.com' } });
      fireEvent.change(screen.getByLabelText(/Agreement Date/), { target: { value: '2024-01-01' } });
      fireEvent.change(screen.getByLabelText(/Effective Date/), { target: { value: '2024-01-01' } });
      fireEvent.change(screen.getByLabelText(/Purpose of Disclosure/), { target: { value: 'Testing' } });
      fireEvent.change(screen.getByLabelText(/Governing Law/), { target: { value: 'Delaware' } });
      fireEvent.change(screen.getByLabelText(/Jurisdiction/), { target: { value: 'Delaware' } });
      
      const generateButton = screen.getByText('Generate NDA Document');
      fireEvent.click(generateButton);
      
      await waitFor(() => {
        expect(screen.getByText('Preview Your Mutual NDA')).toBeInTheDocument();
      });
    });
  });

  describe('Reset Functionality', () => {
    it('shows Start Over button after document is generated', async () => {
      render(<NDAClient />);
      
      // Fill and generate
      fireEvent.change(screen.getByLabelText(/Party A.*Company Name/), { target: { value: 'Company A' } });
      fireEvent.change(screen.getByLabelText(/Party A.*Principal Address/), { target: { value: '123 A St' } });
      fireEvent.change(screen.getByLabelText(/Party A.*Notice Address/), { target: { value: 'notice@a.com' } });
      fireEvent.change(screen.getByLabelText(/Party B.*Company Name/), { target: { value: 'Company B' } });
      fireEvent.change(screen.getByLabelText(/Party B.*Principal Address/), { target: { value: '456 B Ave' } });
      fireEvent.change(screen.getByLabelText(/Party B.*Notice Address/), { target: { value: 'notice@b.com' } });
      fireEvent.change(screen.getByLabelText(/Agreement Date/), { target: { value: '2024-01-01' } });
      fireEvent.change(screen.getByLabelText(/Effective Date/), { target: { value: '2024-01-01' } });
      fireEvent.change(screen.getByLabelText(/Purpose of Disclosure/), { target: { value: 'Testing' } });
      fireEvent.change(screen.getByLabelText(/Governing Law/), { target: { value: 'Delaware' } });
      fireEvent.change(screen.getByLabelText(/Jurisdiction/), { target: { value: 'Delaware' } });
      
      fireEvent.click(screen.getByText('Generate NDA Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Start Over')).toBeInTheDocument();
      });
    });

    it('shows Download PDF button after document is generated', async () => {
      render(<NDAClient />);
      
      // Fill and generate
      fireEvent.change(screen.getByLabelText(/Party A.*Company Name/), { target: { value: 'Company A' } });
      fireEvent.change(screen.getByLabelText(/Party A.*Principal Address/), { target: { value: '123 A St' } });
      fireEvent.change(screen.getByLabelText(/Party A.*Notice Address/), { target: { value: 'notice@a.com' } });
      fireEvent.change(screen.getByLabelText(/Party B.*Company Name/), { target: { value: 'Company B' } });
      fireEvent.change(screen.getByLabelText(/Party B.*Principal Address/), { target: { value: '456 B Ave' } });
      fireEvent.change(screen.getByLabelText(/Party B.*Notice Address/), { target: { value: 'notice@b.com' } });
      fireEvent.change(screen.getByLabelText(/Agreement Date/), { target: { value: '2024-01-01' } });
      fireEvent.change(screen.getByLabelText(/Effective Date/), { target: { value: '2024-01-01' } });
      fireEvent.change(screen.getByLabelText(/Purpose of Disclosure/), { target: { value: 'Testing' } });
      fireEvent.change(screen.getByLabelText(/Governing Law/), { target: { value: 'Delaware' } });
      fireEvent.change(screen.getByLabelText(/Jurisdiction/), { target: { value: 'Delaware' } });
      
      fireEvent.click(screen.getByText('Generate NDA Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Download PDF')).toBeInTheDocument();
      });
    });
  });

  describe('PDF Download', () => {
    it('has Download PDF button after generation', async () => {
      render(<NDAClient />);
      
      // Fill and generate
      fireEvent.change(screen.getByLabelText(/Party A.*Company Name/), { target: { value: 'Company A' } });
      fireEvent.change(screen.getByLabelText(/Party A.*Principal Address/), { target: { value: '123 A St' } });
      fireEvent.change(screen.getByLabelText(/Party A.*Notice Address/), { target: { value: 'notice@a.com' } });
      fireEvent.change(screen.getByLabelText(/Party B.*Company Name/), { target: { value: 'Company B' } });
      fireEvent.change(screen.getByLabelText(/Party B.*Principal Address/), { target: { value: '456 B Ave' } });
      fireEvent.change(screen.getByLabelText(/Party B.*Notice Address/), { target: { value: 'notice@b.com' } });
      fireEvent.change(screen.getByLabelText(/Agreement Date/), { target: { value: '2024-01-01' } });
      fireEvent.change(screen.getByLabelText(/Effective Date/), { target: { value: '2024-01-01' } });
      fireEvent.change(screen.getByLabelText(/Purpose of Disclosure/), { target: { value: 'Testing' } });
      fireEvent.change(screen.getByLabelText(/Governing Law/), { target: { value: 'Delaware' } });
      fireEvent.change(screen.getByLabelText(/Jurisdiction/), { target: { value: 'Delaware' } });
      
      fireEvent.click(screen.getByText('Generate NDA Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Download PDF')).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid form submissions', async () => {
      render(<NDAClient />);
      
      const generateButton = screen.getByText('Generate NDA Document');
      
      // Rapid clicks should not crash
      for (let i = 0; i < 5; i++) {
        fireEvent.click(generateButton);
      }
      
      // Should show validation message
      await waitFor(() => {
        expect(screen.getByText('Please fill in all required fields')).toBeInTheDocument();
      });
    });

    it('handles missing document ref gracefully', async () => {
      render(<NDAClient />);
      
      // Try to find and click download without generating
      const downloadButton = screen.queryByText('Download PDF');
      expect(downloadButton).not.toBeInTheDocument();
    });
  });
});
