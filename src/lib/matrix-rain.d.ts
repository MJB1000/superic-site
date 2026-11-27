/** Types for matrix-rain.js (plain JS canvas effect). */
export interface MatrixRainOptions {
  theme?: "green" | "amber" | (string & {});
  glyphSet?: "mixed" | "katakana" | "binary" | (string & {});
  speed?: number;
  density?: number;
  trail?: number;
  glow?: boolean;
  fontSize?: number;
  [option: string]: unknown;
}

declare class MatrixRain {
  constructor(canvas: HTMLCanvasElement, options?: MatrixRainOptions);
  start(): void;
  stop(): void;
  resize(): void;
  setConfig(partial: MatrixRainOptions): void;
  destroy(): void;
}

export default MatrixRain;
