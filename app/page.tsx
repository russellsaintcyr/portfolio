'use client';

import { createContext, useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Projects from './components/Projects';
import AboutMe from './components/AboutMe';
import Introduction from './components/Introduction';

export const LocationContext = createContext<Location | undefined>(undefined);

export default function Home() {
  const [location, setLocation] = useState<Location | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLocation(window.location);
    }
  }, []);

  return (
    <LocationContext.Provider value={location}>
      <div className="font-display text-gray-800 dark:text-gray-200">
        <div className="relative w-full overflow-x-hidden">
          <Header />
          <main>
            <Introduction />
            <Projects />
            <AboutMe />
          </main>
          <Footer />
        </div>
      </div>
    </LocationContext.Provider>
  );
}
