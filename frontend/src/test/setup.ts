import '@testing-library/jest-dom';

// Mock Next.js dynamic import
vi.mock('next/dynamic', () => {
  return {
    default: (component: unknown) => component,
  };
});

// Mock jspdf
vi.mock('jspdf', () => ({
  jsPDF: vi.fn().mockImplementation(() => ({
    setFont: vi.fn(),
    setFontSize: vi.fn(),
    text: vi.fn(),
    splitTextToSize: vi.fn().mockReturnValue(['mock text']),
    addPage: vi.fn(),
    addImage: vi.fn(),
    save: vi.fn(),
    internal: {
      pageSize: {
        getWidth: () => 8.5,
        getHeight: () => 11,
      },
    },
  })),
}));

// Mock html2pdf.js
vi.mock('html2pdf.js', () => ({
  default: vi.fn().mockReturnValue({
    set: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    save: vi.fn().mockResolvedValue(undefined),
  }),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock window.scrollTo
window.scrollTo = vi.fn();
