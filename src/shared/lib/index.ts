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

export const randomFrom = <T = unknown>(arr: T[]): T => {
  const index = Math.round(Math.random() * arr.length);
  return arr[index];
};

export const uuid = () => (
  crypto.randomUUID()
);

export const downloadFile = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
};

export const readFile = () => {
  return new Promise((resolve, reject) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/json';
    fileInput.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target?.result);
        };
        reader.onerror = (event) => {
          reject(event.target?.error);
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  });
};

export const strIncludes = (str: string, search: string) => {
  return str.toLowerCase().includes(search.toLowerCase());
};
