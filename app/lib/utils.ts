import { useContext } from 'react';
import { LocationContext } from '../page';

/**
 * Get the correct image path based on the deployment environment
 * @param imagePath - The image path without any prefix (e.g., "brianstcyr_portfolio_700x416.webp")
 * @returns The correct path for the current environment
 */
export function getImagePath(imagePath: string): string {
    const currentLocation = useContext(LocationContext);
    const basePath = currentLocation?.pathname ?? '/';
    const newPath = `${basePath}${imagePath}`;
    console.log('Image Path:', newPath);
    return newPath;

}
