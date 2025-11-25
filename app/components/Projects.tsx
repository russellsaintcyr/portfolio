'use client';

import { useEffect, useState } from 'react';
import Project from './Project';
import projects from '../data/projects.json';

export default function Projects() {
  const [currentLocation, setCurrentLocation] = useState<Location>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentLocation(window.location);
    }
  }, []);

  function getImagePath(imagePath: string): string {
    const basePath = currentLocation?.pathname ?? '/';
    const newPath = `${basePath}${imagePath}`;
    return newPath;
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
            {projects.map((project, idx) => (
              <Project
                key={project.title + idx}
                {...project}
                imageSrc={getImagePath(project.imageSrc)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
