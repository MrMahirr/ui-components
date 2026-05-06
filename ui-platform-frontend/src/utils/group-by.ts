/**
 * Generic type-safe utility function to group an array of objects by a specific key.
 * Strictly adheres to SOLID single-responsibility and generic programming principles.
 */
export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
    return array.reduce((acc, item) => {
        const groupValue = String(item[key]);
        if (!acc[groupValue]) {
            acc[groupValue] = [];
        }
        acc[groupValue].push(item);
        return acc;
    }, {} as Record<string, T[]>);
}
