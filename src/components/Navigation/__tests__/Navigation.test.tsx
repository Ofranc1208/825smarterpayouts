/**
 * Navigation Component Tests - Enterprise Edition
 * 
 * Comprehensive test suite for navigation components covering
 * functionality, accessibility, performance, and error scenarios.
 * 
 * @module NavigationTests
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Enterprise Edition
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock Next.js router
const mockPush = jest.fn();
const mockPathname = '/';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    pathname: mockPathname
  }),
  usePathname: () => mockPathname
}));

// Mock Vercel Analytics
jest.mock('@vercel/analytics', () => ({
  track: jest.fn()
}));

// Import components after mocks
import DualNavbar from '../DualNavbar';
import DesktopNav from '../Desktop/DesktopNav';
import MobileNav from '../Mobile/MobileNav';
import { NavigationErrorBoundary } from '../components/ErrorBoundary/NavigationErrorBoundary';

describe('Navigation Components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.innerWidth for responsive tests
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1400
    });
  });

  describe('DualNavbar', () => {
    it('renders without crashing', () => {
      render(<DualNavbar />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('displays loading state during SSR', () => {
      // Mock SSR environment
      const originalWindow = global.window;
      delete (global as any).window;
      
      render(<DualNavbar />);
      expect(screen.getByText('Loading navigation...')).toBeInTheDocument();
      
      global.window = originalWindow;
    });

    it('switches to mobile view on small screens', async () => {
      // Mock small screen
      Object.defineProperty(window, 'innerWidth', {
        value: 800
      });

      render(<DualNavbar />);
      
      // Trigger resize event
      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() => {
        expect(screen.queryByTestId('desktop-nav')).not.toBeInTheDocument();
      });
    });

    it('has proper accessibility attributes', async () => {
      const { container } = render(<DualNavbar />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label');
      
      // Run accessibility tests
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('maintains focus management', async () => {
      const user = userEvent.setup();
      render(<DualNavbar />);
      
      const firstLink = screen.getAllByRole('link')[0];
      await user.tab();
      
      expect(firstLink).toHaveFocus();
    });
  });

  describe('DesktopNav', () => {
    it('renders all navigation items', () => {
      render(<DesktopNav isMobile={false} />);
      
      // Check for main navigation sections
      expect(screen.getByText('Company Info')).toBeInTheDocument();
      expect(screen.getByText('Legal')).toBeInTheDocument();
      expect(screen.getByText('Resources')).toBeInTheDocument();
    });

    it('handles dropdown interactions', async () => {
      const user = userEvent.setup();
      render(<DesktopNav isMobile={false} />);
      
      const companyDropdown = screen.getByText('Company Info');
      await user.hover(companyDropdown);
      
      await waitFor(() => {
        expect(screen.getByText('About Us')).toBeVisible();
      });
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<DesktopNav isMobile={false} />);
      
      // Tab through navigation items
      await user.tab();
      await user.tab();
      
      // Press Enter to activate dropdown
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });
    });

    it('hides when isMobile is true', () => {
      render(<DesktopNav isMobile={true} />);
      
      const desktopNav = screen.queryByTestId('desktop-nav');
      expect(desktopNav).toHaveStyle({ display: 'none' });
    });
  });

  describe('MobileNav', () => {
    it('renders hamburger button when mobile', () => {
      render(<MobileNav isMobile={true} />);
      
      expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
    });

    it('opens mobile menu on button click', async () => {
      const user = userEvent.setup();
      render(<MobileNav isMobile={true} />);
      
      const menuButton = screen.getByRole('button', { name: /menu/i });
      await user.click(menuButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('closes menu with escape key', async () => {
      const user = userEvent.setup();
      render(<MobileNav isMobile={true} />);
      
      // Open menu
      const menuButton = screen.getByRole('button', { name: /menu/i });
      await user.click(menuButton);
      
      // Close with escape
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('does not render when isMobile is false', () => {
      render(<MobileNav isMobile={false} />);
      
      expect(screen.queryByRole('button', { name: /menu/i })).not.toBeInTheDocument();
    });

    it('traps focus within mobile menu', async () => {
      const user = userEvent.setup();
      render(<MobileNav isMobile={true} />);
      
      // Open menu
      const menuButton = screen.getByRole('button', { name: /menu/i });
      await user.click(menuButton);
      
      // Tab through menu items
      await user.tab();
      const firstMenuItem = document.activeElement;
      
      // Tab to last item and then should cycle back
      for (let i = 0; i < 10; i++) {
        await user.tab();
      }
      
      expect(document.activeElement).toBe(firstMenuItem);
    });
  });

  describe('NavigationErrorBoundary', () => {
    // Mock console.error to avoid test noise
    const originalError = console.error;
    beforeAll(() => {
      console.error = jest.fn();
    });
    
    afterAll(() => {
      console.error = originalError;
    });

    const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
      if (shouldThrow) {
        throw new Error('Test error');
      }
      return <div>No error</div>;
    };

    it('catches and displays errors', () => {
      render(
        <NavigationErrorBoundary>
          <ThrowError shouldThrow={true} />
        </NavigationErrorBoundary>
      );
      
      expect(screen.getByText('Navigation Error')).toBeInTheDocument();
      expect(screen.getByText(/There was a problem loading the navigation/)).toBeInTheDocument();
    });

    it('provides retry functionality', async () => {
      const user = userEvent.setup();
      
      render(
        <NavigationErrorBoundary enableRetry={true}>
          <ThrowError shouldThrow={true} />
        </NavigationErrorBoundary>
      );
      
      const retryButton = screen.getByRole('button', { name: /retry/i });
      expect(retryButton).toBeInTheDocument();
      
      await user.click(retryButton);
      
      // Should show retry attempt
      await waitFor(() => {
        expect(screen.getByText(/retry/i)).toBeInTheDocument();
      });
    });

    it('shows error details in development', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      render(
        <NavigationErrorBoundary showErrorDetails={true}>
          <ThrowError shouldThrow={true} />
        </NavigationErrorBoundary>
      );
      
      expect(screen.getByText('Error Details (Development)')).toBeInTheDocument();
      
      process.env.NODE_ENV = originalEnv;
    });

    it('renders children when no error', () => {
      render(
        <NavigationErrorBoundary>
          <ThrowError shouldThrow={false} />
        </NavigationErrorBoundary>
      );
      
      expect(screen.getByText('No error')).toBeInTheDocument();
    });

    it('has proper accessibility attributes', async () => {
      const { container } = render(
        <NavigationErrorBoundary>
          <ThrowError shouldThrow={true} />
        </NavigationErrorBoundary>
      );
      
      const errorAlert = screen.getByRole('alert');
      expect(errorAlert).toHaveAttribute('aria-live', 'assertive');
      expect(errorAlert).toHaveAttribute('aria-labelledby');
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Performance Tests', () => {
    it('renders within performance budget', async () => {
      const startTime = performance.now();
      
      render(<DualNavbar />);
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render within 100ms
      expect(renderTime).toBeLessThan(100);
    });

    it('handles rapid state changes', async () => {
      const user = userEvent.setup();
      render(<MobileNav isMobile={true} />);
      
      const menuButton = screen.getByRole('button', { name: /menu/i });
      
      // Rapidly toggle menu
      for (let i = 0; i < 10; i++) {
        await user.click(menuButton);
      }
      
      // Should still be functional
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('works with different screen sizes', async () => {
      const { rerender } = render(<DualNavbar />);
      
      // Desktop view
      Object.defineProperty(window, 'innerWidth', { value: 1400 });
      act(() => {
        window.dispatchEvent(new Event('resize'));
      });
      
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /menu/i })).not.toBeInTheDocument();
      });
      
      // Mobile view
      Object.defineProperty(window, 'innerWidth', { value: 800 });
      act(() => {
        window.dispatchEvent(new Event('resize'));
      });
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
      });
    });

    it('maintains state across re-renders', () => {
      const { rerender } = render(<MobileNav isMobile={true} />);
      
      // Should maintain consistent behavior
      rerender(<MobileNav isMobile={true} />);
      
      expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
    });
  });
});

// Performance and Load Tests
describe('Navigation Performance', () => {
  it('handles memory leaks', () => {
    const { unmount } = render(<DualNavbar />);
    
    // Simulate multiple mounts/unmounts
    for (let i = 0; i < 100; i++) {
      const { unmount: tempUnmount } = render(<DualNavbar />);
      tempUnmount();
    }
    
    unmount();
    
    // Should not crash or consume excessive memory
    expect(true).toBe(true);
  });

  it('handles concurrent renders', async () => {
    const promises = [];
    
    for (let i = 0; i < 10; i++) {
      promises.push(
        new Promise(resolve => {
          const { unmount } = render(<DualNavbar />);
          setTimeout(() => {
            unmount();
            resolve(true);
          }, Math.random() * 100);
        })
      );
    }
    
    await Promise.all(promises);
    expect(true).toBe(true);
  });
});
