// Shared utilities and helpers public API
// Export your utility functions here
// Example: export { formatDate } from './dateUtils';

export const deepClone = <T = unknown>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const range = (
  start: number,
  end?: number,
  step: number = 1,
): number[] => {
  let output = [];

  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  return output;
};
