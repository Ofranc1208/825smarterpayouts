/**
 * 🎨 HOVER EFFECTS - TypeScript Type Definitions
 * 
 * Type definitions for all hover effect configurations.
 * 
 * @module HoverTypes
 */

export interface FloatHoverOptions {
  translateY?: number;
  scale?: number;
  shadowColor?: string;
  shadowSize?: string;
  borderColor?: string;
  backgroundColor?: string;
}

export interface SlideHoverOptions {
  translateX?: number;
  shadowColor?: string;
  shadowSize?: string;
  borderColor?: string;
}

export interface ScaleHoverOptions {
  scale?: number;
  shadowColor?: string;
  shadowSize?: string;
}

