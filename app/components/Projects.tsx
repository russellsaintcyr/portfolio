'use client';

import { useEffect, useState } from 'react';
import Project from './Project';

export default function Projects() {

  const [currentLocation, setCurrentLocation] = useState<Location | undefined>();
  
  useEffect(() => {
        // This code will only run on the client-side after the component mounts
        if (typeof window !== 'undefined') {
          console.log('window.location in Projects component:', window.location);
          setCurrentLocation(window.location);
        }
      }, []); // Empty dependency array ensures it runs only once after initial render

  function getImagePath(imagePath: string): string {
    // Ensure imagePath starts with "/"
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return cleanPath;
  }

  return (
    <section className="bg-white dark:bg-gray-900 py-8 md:py-8" id="projects">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-10 @container">
          <div className="flex flex-col gap-4 text-center items-center">
            <h2
              className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight md:text-4xl">
              Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal max-w-3xl">Here
              are some of the projects I'm proud to have worked on. Each project showcases my skills in
              creating user-friendly web solutions with robust backends and industry best practices.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Project
              imageSrc={getImagePath("brianstcyr_portfolio_700x416.webp")}
              imageAlt="Screenshot of Brian St. Cyr Portfolio"
              title="Brian St. Cyr Portfolio"
              description="A modern portfolio website built with Next.js and Contentful to showcase and sell artwork, featuring responsive design and lazy loading."
              skills={['React', 'Next.js', 'Contentful CMS', 'TypeScript', 'Tailwind CSS']}
              showGitHubRepo={true}
              showLiveDemo={true}
              liveDemoUrl="https://russellsaintcyr.github.io/brianstcyr-portfolio"
              githubRepoUrl="https://github.com/russellsaintcyr/brianstcyr-portfolio"
            />
            <Project
              imageSrc={getImagePath("now_playing_700x490.webp")}
              imageAlt="Screenshot of Playlist Manager showing music interface"
              title="Playlist Manager"
              description="A passion project allowing users to manage playlists and rate tracks, with playback functionality. Built with Angular and Firebase, but being redesigned for React Native/Expo."
              skills={['Angular', 'TypeScript', 'Firebase', 'Node.js', 'Bootstrap', 'Spotify']}
              showGitHubRepo={true}
              showLiveDemo={true}
              liveDemoUrl="https://russellsaintcyr.github.io/playlist-manager"
              githubRepoUrl="https://github.com/russellsaintcyr/playlist-webapp"
            />
            <Project
              imageSrc={getImagePath("worldweary_700x414.webp")}
              imageAlt="Screenshot of World Weary advice column website"
              title="World Weary"
              description="A website for Ireland's only independent advice column. Included the ability for users to submit and search for questions, and for adminstrators to manage and respond to submissions."
              skills={['JSP', 'Java', 'MySQL']}
            />
            <Project
              imageSrc={getImagePath("futurecults_700x384.webp")}
              imageAlt="Screenshot of Futurecults interactive map and story website"
              title="Futurecults"
              description="An artist's website for users to read fictional stories of characters selected on a map of Los Angeles, with accompanying songs per character. Included an advanced adminstrative website for managing and styling content."
              skills={['Angular', 'MongoDB', 'Bootstrap', 'Google Maps API']}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
