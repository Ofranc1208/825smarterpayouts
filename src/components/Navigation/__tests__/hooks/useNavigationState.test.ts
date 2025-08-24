import { renderHook, act } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { useNavigationState } from '../../hooks/useNavigationState';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

/**
 * Navigation State Hook Test Suite
 * 
 * Tests for the useNavigationState custom hook including:
 * - State initialization
 * - Responsive behavior
 * - State updates
 * - Cleanup and memory management
 * 
 * @author SmarterPayouts Team
 * @since 2024
 */
describe('useNavigationState Hook', () => {
  const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

  beforeEach(() => {
    mockUsePathname.mockReturnValue('/test-page');
    
    // Mock window properties
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    // Mock addEventListener/removeEventListener
    const mockAddEventListener = jest.fn();
    const mockRemoveEventListener = jest.fn();
    window.addEventListener = mockAddEventListener;
    window.removeEventListener = mockRemoveEventListener;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('State Initialization', () => {
    it('initializes with correct default state', () => {
      const { result } = renderHook(() => useNavigationState());

      expect(result.current.state).toEqual({
        isMobile: false,
        isClient: true,
        mobileMenuOpen: false,
        activeDropdown: null,
        expandedMobileSection: null,
        searchValue: '',
        pathname: '/test-page'
      });
    });

    it('provides all required actions', () => {
      const { result } = renderHook(() => useNavigationState());

      expect(result.current.actions).toHaveProperty('setMobileMenuOpen');
      expect(result.current.actions).toHaveProperty('toggleMobileMenu');
      expect(result.current.actions).toHaveProperty('closeMobileMenu');
      expect(result.current.actions).toHaveProperty('setActiveDropdown');
      expect(result.current.actions).toHaveProperty('closeAllDropdowns');
      expect(result.current.actions).toHaveProperty('setExpandedMobileSection');
      expect(result.current.actions).toHaveProperty('toggleMobileSection');
      expect(result.current.actions).toHaveProperty('setSearchValue');
      expect(result.current.actions).toHaveProperty('clearSearch');
    });
  });

  describe('Responsive Behavior', () => {
    it('detects mobile screen size correctly', () => {
      Object.defineProperty(window, 'innerWidth', { value: 600 });
      
      const { result } = renderHook(() => useNavigationState());

      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      expect(result.current.state.isMobile).toBe(true);
    });

    it('detects desktop screen size correctly', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1200 });
      
      const { result } = renderHook(() => useNavigationState());

      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      expect(result.current.state.isMobile).toBe(false);
    });

    it('closes mobile menu when switching to desktop', () => {
      const { result } = renderHook(() => useNavigationState());

      // Open mobile menu
      act(() => {
        result.current.actions.setMobileMenuOpen(true);
      });

      expect(result.current.state.mobileMenuOpen).toBe(true);

      // Switch to desktop
      act(() => {
        Object.defineProperty(window, 'innerWidth', { value: 1200 });
        window.dispatchEvent(new Event('resize'));
      });

      expect(result.current.state.mobileMenuOpen).toBe(false);
    });
  });

  describe('State Updates', () => {
    it('toggles mobile menu correctly', () => {
      const { result } = renderHook(() => useNavigationState());

      act(() => {
        result.current.actions.toggleMobileMenu();
      });

      expect(result.current.state.mobileMenuOpen).toBe(true);

      act(() => {
        result.current.actions.toggleMobileMenu();
      });

      expect(result.current.state.mobileMenuOpen).toBe(false);
    });

    it('sets active dropdown correctly', () => {
      const { result } = renderHook(() => useNavigationState());

      act(() => {
        result.current.actions.setActiveDropdown('whyUs');
      });

      expect(result.current.state.activeDropdown).toBe('whyUs');

      act(() => {
        result.current.actions.setActiveDropdown(null);
      });

      expect(result.current.state.activeDropdown).toBe(null);
    });

    it('toggles mobile section correctly', () => {
      const { result } = renderHook(() => useNavigationState());

      act(() => {
        result.current.actions.toggleMobileSection('resources');
      });

      expect(result.current.state.expandedMobileSection).toBe('resources');

      act(() => {
        result.current.actions.toggleMobileSection('resources');
      });

      expect(result.current.state.expandedMobileSection).toBe(null);
    });

    it('updates search value correctly', () => {
      const { result } = renderHook(() => useNavigationState());

      act(() => {
        result.current.actions.setSearchValue('test search');
      });

      expect(result.current.state.searchValue).toBe('test search');

      act(() => {
        result.current.actions.clearSearch();
      });

      expect(result.current.state.searchValue).toBe('');
    });
  });

  describe('Pathname Changes', () => {
    it('closes menus when pathname changes', () => {
      const { result, rerender } = renderHook(() => useNavigationState());

      // Open menus
      act(() => {
        result.current.actions.setMobileMenuOpen(true);
        result.current.actions.setActiveDropdown('whyUs');
        result.current.actions.setExpandedMobileSection('resources');
      });

      expect(result.current.state.mobileMenuOpen).toBe(true);
      expect(result.current.state.activeDropdown).toBe('whyUs');
      expect(result.current.state.expandedMobileSection).toBe('resources');

      // Change pathname
      mockUsePathname.mockReturnValue('/new-page');
      rerender();

      expect(result.current.state.mobileMenuOpen).toBe(false);
      expect(result.current.state.activeDropdown).toBe(null);
      expect(result.current.state.expandedMobileSection).toBe(null);
    });
  });

  describe('Cleanup and Memory Management', () => {
    it('removes event listeners on unmount', () => {
      const mockRemoveEventListener = jest.fn();
      window.removeEventListener = mockRemoveEventListener;

      const { unmount } = renderHook(() => useNavigationState());

      unmount();

      expect(mockRemoveEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });

    it('cleans up click outside listeners', () => {
      const mockRemoveEventListener = jest.fn();
      document.removeEventListener = mockRemoveEventListener;

      const { result, unmount } = renderHook(() => useNavigationState());

      // Open dropdown to activate listeners
      act(() => {
        result.current.actions.setActiveDropdown('whyUs');
      });

      unmount();

      expect(mockRemoveEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });
  });
});
