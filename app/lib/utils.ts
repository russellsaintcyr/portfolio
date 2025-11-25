import { getBasePath } from './getBasePath';

/**
 * Get the correct image path based on the deployment environment
 * @param imagePath - The image path without any prefix (e.g., "brianstcyr_portfolio_700x416.webp")
 * @returns The correct path for the current environment
 */
export function getImagePath(imagePath: string): string {
  const basePath = getBasePath();
  // Ensure imagePath starts with "/"
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  // Return path with or without basePath depending on environment
  return `${basePath}${cleanPath}`;
}