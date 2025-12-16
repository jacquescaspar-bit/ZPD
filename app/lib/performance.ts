import React from "react";
import { performanceEvents } from "@/lib/analytics";

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private observers = new Map<string, PerformanceObserver>();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Initialize performance monitoring
  init(): void {
    if (typeof window === "undefined" || !window.PerformanceObserver) {
      console.warn("Performance monitoring not supported in this browser");
      return;
    }

    this.setupObservers();
    this.trackPageLoadTime();
    this.trackResourceTiming();
  }

  // Set up performance observers
  private setupObservers(): void {
    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        performanceEvents.pageLoadTime(lastEntry.startTime, "LCP");
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      this.observers.set("lcp", lcpObserver);
    } catch (e) {
      console.warn("LCP observation not supported");
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          performanceEvents.pageLoadTime(
            entry.processingStart - entry.startTime,
            "FID",
          );
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });
      this.observers.set("fid", fidObserver);
    } catch (e) {
      console.warn("FID observation not supported");
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        performanceEvents.pageLoadTime(clsValue, "CLS");
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
      this.observers.set("cls", clsObserver);
    } catch (e) {
      console.warn("CLS observation not supported");
    }
  }

  // Track page load time
  private trackPageLoadTime(): void {
    if (typeof window !== "undefined" && window.performance) {
      window.addEventListener("load", () => {
        const loadTime = window.performance.now();
        performanceEvents.pageLoadTime(loadTime, window.location.pathname);
      });
    }
  }

  // Track resource timing
  private trackResourceTiming(): void {
    if (typeof window !== "undefined" && window.performance) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          const resources = performance.getEntriesByType(
            "resource",
          ) as PerformanceResourceTiming[];
          resources.forEach((resource) => {
            if (resource.duration > 1000) {
              // Only track slow resources
              performanceEvents.apiResponseTime(
                resource.name,
                resource.duration,
              );
            }
          });
        }, 1000);
      });
    }
  }

  // Track custom component load times
  trackComponentLoad(componentName: string, startTime: number): void {
    const loadTime = performance.now() - startTime;
    performanceEvents.widgetLoadTime(loadTime);

    // Log to console for development
    console.log(`${componentName} loaded in ${loadTime.toFixed(2)}ms`);
  }

  // Track user interactions
  trackInteraction(
    interactionType: string,
    element: string,
    timeToAction: number,
  ): void {
    // Custom event for interaction tracking
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "user_interaction", {
        interaction_type: interactionType,
        element,
        time_to_action: timeToAction,
      });
    }
  }

  // Track form interactions
  trackFormInteraction(
    formName: string,
    fieldName: string,
    action: string,
  ): void {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "form_interaction", {
        form_name: formName,
        field_name: fieldName,
        action,
      });
    }
  }

  // Track enrollment flow performance
  trackEnrollmentStepTime(stepName: string, duration: number): void {
    performanceEvents.pageLoadTime(duration, `enrollment_${stepName}`);
  }

  // Memory usage tracking
  trackMemoryUsage(): void {
    if (typeof window !== "undefined" && (window.performance as any).memory) {
      const { memory } = window.performance as any;
      console.log("Memory Usage:", {
        used: `${Math.round((memory.usedJSHeapSize / 1048576) * 100) / 100} MB`,
        total: `${Math.round((memory.totalJSHeapSize / 1048576) * 100) / 100} MB`,
        limit: `${Math.round((memory.jsHeapSizeLimit / 1048576) * 100) / 100} MB`,
      });
    }
  }

  // Cleanup observers
  destroy(): void {
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();
  }
}

// Singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// React hook for component performance tracking
export const usePerformanceTracking = (componentName: string) => {
  React.useEffect(() => {
    const startTime = performance.now();

    return () => {
      performanceMonitor.trackComponentLoad(componentName, startTime);
    };
  }, [componentName]);
};

// Utility functions for common performance measurements
export const measureExecutionTime = async <T>(
  fn: () => Promise<T> | T,
  label: string,
): Promise<T> => {
  const startTime = performance.now();
  try {
    const result = await fn();
    const endTime = performance.now();
    console.log(`${label} took ${endTime - startTime}ms`);
    return result;
  } catch (error) {
    const endTime = performance.now();
    console.error(`${label} failed after ${endTime - startTime}ms:`, error);
    throw error;
  }
};

// Network request timing
export const trackApiCall = async (
  url: string,
  method: string,
  fn: () => Promise<any>,
): Promise<any> => {
  const startTime = performance.now();
  try {
    const result = await fn();
    const duration = performance.now() - startTime;
    performanceEvents.apiResponseTime(`${method} ${url}`, duration);
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    console.error(`API call to ${url} failed after ${duration}ms:`, error);
    throw error;
  }
};

// Error tracking
export const trackError = (error: Error, context?: string): void => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "exception", {
      description: error.message,
      fatal: false,
      context: context || "unknown",
    });
  }

  // Also log to console
  console.error(`Error in ${context || "unknown"}:`, error);
};

// User journey timing
export class UserJourneyTimer {
  private startTime = 0;
  private checkpoints = new Map<string, number>();

  start(): void {
    this.startTime = performance.now();
    this.checkpoints.set("start", this.startTime);
  }

  checkpoint(name: string): void {
    const time = performance.now();
    this.checkpoints.set(name, time);

    const duration = time - this.startTime;
    performanceEvents.pageLoadTime(duration, `journey_${name}`);
  }

  getDuration(from?: string, to?: string): number {
    const fromTime = from ? this.checkpoints.get(from) : this.startTime;
    const toTime = to ? this.checkpoints.get(to) : performance.now();

    if (!fromTime || !toTime) return 0;
    return toTime - fromTime;
  }

  getAllCheckpoints(): Record<string, number> {
    const result: Record<string, number> = {};
    this.checkpoints.forEach((time, name) => {
      result[name] = time - this.startTime;
    });
    return result;
  }
}

// Initialize performance monitoring when the module loads
if (typeof window !== "undefined") {
  // Delay initialization to ensure DOM is ready
  setTimeout(() => {
    performanceMonitor.init();
  }, 100);
}
