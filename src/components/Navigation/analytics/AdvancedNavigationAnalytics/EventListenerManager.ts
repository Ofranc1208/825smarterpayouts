/**
 * Event Listener Manager - DOM Event Handling
 * 
 * Manages all DOM event listeners for analytics tracking including
 * mouse events, keyboard events, and custom navigation events.
 * 
 * @module EventListenerManager
 * @author SmarterPayouts Team
 * @since 2024
 * @version 1.0.0 - Perfection Edition
 */

import type { UserJourneyStep, EventHandlerConfig, AdvancedAnalyticsConfig } from './types';
import type { HeatmapTracker } from './HeatmapTracker';
import type { UserJourneyAnalyzer } from './UserJourneyAnalyzer';

export class EventListenerManager {
  private config: AdvancedAnalyticsConfig;
  private heatmapTracker: HeatmapTracker;
  private journeyAnalyzer: UserJourneyAnalyzer;
  private isTracking: boolean = false;
  private eventHandlers: Map<string, EventListener> = new Map();

  constructor(
    config: AdvancedAnalyticsConfig,
    heatmapTracker: HeatmapTracker,
    journeyAnalyzer: UserJourneyAnalyzer
  ) {
    this.config = config;
    this.heatmapTracker = heatmapTracker;
    this.journeyAnalyzer = journeyAnalyzer;
  }

  /**
   * Setup all event listeners
   */
  setupEventListeners(): void {
    if (typeof window === 'undefined' || this.isTracking) return;

    this.isTracking = true;

    // Mouse tracking for heatmaps
    if (this.config.enableHeatmaps) {
      this.setupMouseTracking();
    }

    // User journey tracking
    if (this.config.enableUserJourneys) {
      this.setupJourneyTracking();
    }

    // Navigation-specific events
    this.setupNavigationEvents();

    // Keyboard events
    this.setupKeyboardEvents();

    // Window events
    this.setupWindowEvents();

    console.log('Event listeners setup complete');
  }

  /**
   * Setup mouse tracking events
   */
  private setupMouseTracking(): void {
    const mouseMoveHandler = this.throttle((event: Event) => {
      this.heatmapTracker.handleMouseMove(event as MouseEvent);
    }, 100); // Throttle to every 100ms

    const clickHandler = (event: Event) => {
      this.heatmapTracker.handleClick(event as MouseEvent);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('click', clickHandler);

    this.eventHandlers.set('mousemove', mouseMoveHandler);
    this.eventHandlers.set('click', clickHandler);
  }

  /**
   * Setup journey tracking events
   */
  private setupJourneyTracking(): void {
    const journeyClickHandler = (event: Event) => {
      this.handleJourneyEvent(event);
    };

    const journeyFocusHandler = (event: Event) => {
      this.handleJourneyEvent(event);
    };

    const scrollHandler = this.throttle(() => {
      this.handleScroll();
    }, 250); // Throttle scroll events

    document.addEventListener('click', journeyClickHandler);
    document.addEventListener('focus', journeyFocusHandler, true);
    document.addEventListener('scroll', scrollHandler);

    this.eventHandlers.set('journey-click', journeyClickHandler);
    this.eventHandlers.set('journey-focus', journeyFocusHandler);
    this.eventHandlers.set('scroll', scrollHandler);
  }

  /**
   * Setup navigation-specific events
   */
  private setupNavigationEvents(): void {
    const navigationHoverHandler = (event: Event) => {
      this.handleNavigationHover(event);
    };

    const dropdownOpenHandler = (event: Event) => {
      this.handleDropdownOpen(event);
    };

    document.addEventListener('navigation-item-hover', navigationHoverHandler as EventListener);
    document.addEventListener('navigation-dropdown-open', dropdownOpenHandler as EventListener);

    this.eventHandlers.set('navigation-hover', navigationHoverHandler);
    this.eventHandlers.set('navigation-dropdown', dropdownOpenHandler);
  }

  /**
   * Setup keyboard events
   */
  private setupKeyboardEvents(): void {
    const keydownHandler = (event: Event) => {
      this.handleKeyboardEvent(event as KeyboardEvent);
    };

    document.addEventListener('keydown', keydownHandler);
    this.eventHandlers.set('keydown', keydownHandler);
  }

  /**
   * Setup window events
   */
  private setupWindowEvents(): void {
    const resizeHandler = this.throttle(() => {
      this.handleWindowResize();
    }, 500);

    const visibilityHandler = () => {
      this.handleVisibilityChange();
    };

    const beforeUnloadHandler = () => {
      this.handleBeforeUnload();
    };

    window.addEventListener('resize', resizeHandler);
    document.addEventListener('visibilitychange', visibilityHandler);
    window.addEventListener('beforeunload', beforeUnloadHandler);

    this.eventHandlers.set('resize', resizeHandler);
    this.eventHandlers.set('visibilitychange', visibilityHandler);
    this.eventHandlers.set('beforeunload', beforeUnloadHandler);
  }

  /**
   * Handle journey events
   */
  private handleJourneyEvent(event: Event): void {
    const target = event.target as Element;
    if (!target.closest('[data-nav-element]')) return;

    const action = event.type as UserJourneyStep['action'];
    const step: UserJourneyStep = {
      action,
      element: target.getAttribute('data-nav-element') || target.id || target.className,
      timestamp: Date.now()
    };

    this.journeyAnalyzer.addJourneyStep(step);
  }

  /**
   * Handle scroll events
   */
  private handleScroll(): void {
    const step: UserJourneyStep = {
      action: 'scroll',
      element: 'navigation',
      timestamp: Date.now(),
      metadata: {
        scrollY: window.scrollY,
        scrollX: window.scrollX
      }
    };

    this.journeyAnalyzer.addJourneyStep(step);
  }

  /**
   * Handle navigation hover events
   */
  private handleNavigationHover(event: Event): void {
    const customEvent = event as CustomEvent;
    if (customEvent.detail) {
      const step: UserJourneyStep = {
        action: 'hover',
        element: customEvent.detail.element || 'unknown',
        timestamp: Date.now(),
        duration: customEvent.detail.duration,
        metadata: customEvent.detail
      };

      this.journeyAnalyzer.addJourneyStep(step);
    }
  }

  /**
   * Handle dropdown open events
   */
  private handleDropdownOpen(event: Event): void {
    const customEvent = event as CustomEvent;
    if (customEvent.detail) {
      const step: UserJourneyStep = {
        action: 'view',
        element: `dropdown-${customEvent.detail.section || 'unknown'}`,
        timestamp: Date.now(),
        metadata: customEvent.detail
      };

      this.journeyAnalyzer.addJourneyStep(step);
    }
  }

  /**
   * Handle keyboard events
   */
  private handleKeyboardEvent(event: KeyboardEvent): void {
    // Track navigation-relevant keyboard events
    const navigationKeys = ['Tab', 'Enter', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    
    if (navigationKeys.includes(event.key)) {
      const target = event.target as Element;
      if (target.closest('[data-nav-element]')) {
        const step: UserJourneyStep = {
          action: 'focus',
          element: target.getAttribute('data-nav-element') || target.id || target.className,
          timestamp: Date.now(),
          metadata: {
            key: event.key,
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey,
            altKey: event.altKey
          }
        };

        this.journeyAnalyzer.addJourneyStep(step);
      }
    }
  }

  /**
   * Handle window resize
   */
  private handleWindowResize(): void {
    const step: UserJourneyStep = {
      action: 'view',
      element: 'window-resize',
      timestamp: Date.now(),
      metadata: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };

    this.journeyAnalyzer.addJourneyStep(step);
  }

  /**
   * Handle visibility change
   */
  private handleVisibilityChange(): void {
    const step: UserJourneyStep = {
      action: 'view',
      element: 'page-visibility',
      timestamp: Date.now(),
      metadata: {
        hidden: document.hidden,
        visibilityState: document.visibilityState
      }
    };

    this.journeyAnalyzer.addJourneyStep(step);
  }

  /**
   * Handle before unload
   */
  private handleBeforeUnload(): void {
    const step: UserJourneyStep = {
      action: 'view',
      element: 'page-unload',
      timestamp: Date.now()
    };

    this.journeyAnalyzer.addJourneyStep(step);
  }

  /**
   * Throttle function to limit event frequency
   */
  private throttle<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;

    return ((...args: Parameters<T>) => {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    }) as T;
  }

  /**
   * Debounce function to delay event execution
   */
  private debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timeoutId: NodeJS.Timeout | null = null;

    return ((...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => func(...args), delay);
    }) as T;
  }

  /**
   * Remove all event listeners
   */
  removeEventListeners(): void {
    if (!this.isTracking) return;

    // Remove mouse events
    const mouseMoveHandler = this.eventHandlers.get('mousemove');
    const clickHandler = this.eventHandlers.get('click');
    if (mouseMoveHandler) document.removeEventListener('mousemove', mouseMoveHandler);
    if (clickHandler) document.removeEventListener('click', clickHandler);

    // Remove journey events
    const journeyClickHandler = this.eventHandlers.get('journey-click');
    const journeyFocusHandler = this.eventHandlers.get('journey-focus');
    const scrollHandler = this.eventHandlers.get('scroll');
    if (journeyClickHandler) document.removeEventListener('click', journeyClickHandler);
    if (journeyFocusHandler) document.removeEventListener('focus', journeyFocusHandler, true);
    if (scrollHandler) document.removeEventListener('scroll', scrollHandler);

    // Remove navigation events
    const navigationHoverHandler = this.eventHandlers.get('navigation-hover');
    const dropdownHandler = this.eventHandlers.get('navigation-dropdown');
    if (navigationHoverHandler) document.removeEventListener('navigation-item-hover', navigationHoverHandler as EventListener);
    if (dropdownHandler) document.removeEventListener('navigation-dropdown-open', dropdownHandler as EventListener);

    // Remove keyboard events
    const keydownHandler = this.eventHandlers.get('keydown');
    if (keydownHandler) document.removeEventListener('keydown', keydownHandler);

    // Remove window events
    const resizeHandler = this.eventHandlers.get('resize');
    const visibilityHandler = this.eventHandlers.get('visibilitychange');
    const beforeUnloadHandler = this.eventHandlers.get('beforeunload');
    if (resizeHandler) window.removeEventListener('resize', resizeHandler);
    if (visibilityHandler) document.removeEventListener('visibilitychange', visibilityHandler);
    if (beforeUnloadHandler) window.removeEventListener('beforeunload', beforeUnloadHandler);

    this.eventHandlers.clear();
    this.isTracking = false;

    console.log('All event listeners removed');
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<AdvancedAnalyticsConfig>): void {
    this.config = { ...this.config, ...config };
    
    // Restart event listeners if tracking status changed
    if (!this.config.enableHeatmaps || !this.config.enableUserJourneys) {
      this.removeEventListeners();
      this.setupEventListeners();
    }
  }

  /**
   * Get tracking status
   */
  isCurrentlyTracking(): boolean {
    return this.isTracking;
  }

  /**
   * Get registered event handlers count
   */
  getEventHandlerCount(): number {
    return this.eventHandlers.size;
  }
}

export default EventListenerManager;
