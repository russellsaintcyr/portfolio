import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <span className="text-xl font-bold text-gray-900 dark:text-white">Russell Saint Cyr</span>
        <div className="hidden md:flex items-center space-x-6">
          <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            href="#home">Home</a>
          <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            href="#projects">Projects</a>
          <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            href="#about">About</a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="https://github.com/russellsaintcyr" target="_blank" >
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/russellsaintcyr/" target="_blank">
            <FaLinkedin size={24} />
          </a>
        </div>
      </nav>
    </header>
  );
}
