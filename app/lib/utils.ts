import { getBasePath } from './getBasePath';

/**
 * Get the correct image path based on the deployment environment
 * @param imagePath - The image path without any prefix (e.g., "brianstcyr_portfolio_700x416.webp")
 * @returns The correct path for the current environment
 */
export function getImagePath(imagePath: string): string {
    const basePath = getBasePath();
    console.log('Base Path:', basePath);

    if (typeof window !== 'undefined') {
        console.log('window.location', window.location);
    } else {
        console.log('window is undefined');
    }
    // Ensure imagePath starts with "/"
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

    // Return path with or without basePath depending on environment
    return `${basePath}${cleanPath}`;
}