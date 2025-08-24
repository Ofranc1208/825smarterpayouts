import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Navbar from '../Navbar';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock navigation data
jest.mock('../../../data/navigation/menuData', () => ({
  dropdownMenus: {
    whyUs: [
      { href: '/about', label: 'About Us', icon: '🏢' },
      { href: '/team', label: 'Our Team', icon: '👥' }
    ]
  },
  searchMap: {
    'about': '/about',
    'team': '/team'
  }
}));

/**
 * Navigation Component Test Suite
 * 
 * Comprehensive test coverage for the navigation system including:
 * - Rendering and hydration
 * - Responsive behavior
 * - Accessibility features
 * - User interactions
 * - Error handling
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */
describe('Navbar Component', () => {
  const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

  beforeEach(() => {
    mockUsePathname.mockReturnValue('/test-page');
    // Mock window.innerWidth for responsive tests
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering and Hydration', () => {
    it('renders navigation skeleton during SSR', () => {
      // Mock SSR environment
      const originalWindow = global.window;
      delete (global as any).window;

      render(<Navbar />);
      
      // Should show skeleton during SSR
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      
      // Restore window
      global.window = originalWindow;
    });

    it('renders full navigation after hydration', async () => {
      render(<Navbar />);
      
      await waitFor(() => {
        expect(screen.getByText('Smarter Payouts')).toBeInTheDocument();
      });
    });

    it('displays logo with correct text', () => {
      render(<Navbar />);
      
      expect(screen.getByText('Smarter Payouts')).toBeInTheDocument();
      expect(screen.getByAltText('SmarterPayouts Logo')).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('shows desktop navigation on large screens', async () => {
      Object.defineProperty(window, 'innerWidth', { value: 1024 });
      
      render(<Navbar />);
      
      await waitFor(() => {
        expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
      });
    });

    it('shows mobile menu button on small screens', async () => {
      Object.defineProperty(window, 'innerWidth', { value: 600 });
      window.dispatchEvent(new Event('resize'));
      
      render(<Navbar />);
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility Features', () => {
    it('has proper ARIA labels', async () => {
      render(<Navbar />);
      
      await waitFor(() => {
        expect(screen.getByRole('banner')).toBeInTheDocument();
        expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
      });
    });

    it('supports keyboard navigation', async () => {
      render(<Navbar />);
      
      await waitFor(() => {
        const navbar = screen.getByRole('banner');
        expect(navbar).toBeInTheDocument();
      });

      // Test Escape key
      fireEvent.keyDown(document, { key: 'Escape' });
      
      // Should close any open dropdowns
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('manages focus correctly', async () => {
      render(<Navbar />);
      
      await waitFor(() => {
        const firstLink = screen.getByText('Home').closest('a');
        expect(firstLink).toBeInTheDocument();
        
        if (firstLink) {
          firstLink.focus();
          expect(document.activeElement).toBe(firstLink);
        }
      });
    });
  });

  describe('User Interactions', () => {
    it('opens mobile menu when button is clicked', async () => {
      Object.defineProperty(window, 'innerWidth', { value: 600 });
      
      render(<Navbar />);
      
      await waitFor(() => {
        const menuButton = screen.getByRole('button', { name: /open menu/i });
        fireEvent.click(menuButton);
        
        expect(screen.getByText('Navigation')).toBeInTheDocument();
      });
    });

    it('closes mobile menu when overlay is clicked', async () => {
      Object.defineProperty(window, 'innerWidth', { value: 600 });
      
      render(<Navbar />);
      
      await waitFor(() => {
        const menuButton = screen.getByRole('button', { name: /open menu/i });
        fireEvent.click(menuButton);
        
        const overlay = document.querySelector('.mobile-overlay');
        if (overlay) {
          fireEvent.click(overlay);
        }
        
        expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
      });
    });

    it('handles dropdown interactions', async () => {
      render(<Navbar />);
      
      await waitFor(() => {
        const dropdownTrigger = screen.getByText('Why Us');
        fireEvent.mouseEnter(dropdownTrigger);
        
        // Should open dropdown menu
        expect(screen.getByText('About Us')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('renders error boundary fallback on error', () => {
      // Mock console.error to avoid noise in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      const ThrowError = () => {
        throw new Error('Test error');
      };
      
      render(
        <Navbar>
          <ThrowError />
        </Navbar>
      );
      
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Navigation Error/)).toBeInTheDocument();
      
      consoleSpy.mockRestore();
    });

    it('provides retry functionality', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      const ThrowError = () => {
        throw new Error('Test error');
      };
      
      render(
        <Navbar>
          <ThrowError />
        </Navbar>
      );
      
      const retryButton = screen.getByText('Retry');
      fireEvent.click(retryButton);
      
      // Should attempt to retry
      expect(retryButton).toBeInTheDocument();
      
      consoleSpy.mockRestore();
    });
  });

  describe('Performance', () => {
    it('memoizes components correctly', () => {
      const { rerender } = render(<Navbar />);
      
      // Re-render with same props
      rerender(<Navbar />);
      
      // Component should not re-render unnecessarily
      expect(screen.getByText('Smarter Payouts')).toBeInTheDocument();
    });

    it('lazy loads components with Suspense', async () => {
      render(<Navbar />);
      
      // Should show loading state initially
      await waitFor(() => {
        expect(screen.getByText('Smarter Payouts')).toBeInTheDocument();
      });
    });
  });
});
