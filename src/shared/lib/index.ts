// Shared utilities and helpers public API
// Export your utility functions here
// Example: export { formatDate } from './dateUtils';

export const deepClone = <T = unknown>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
};
