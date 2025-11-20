import Header from './components/Header';
import Footer from './components/Footer';
import Projects from './components/Projects';
import AboutMe from './components/AboutMe';
import Introduction from './components/Introduction';

export default function Home() {
  return (
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
  );
}
