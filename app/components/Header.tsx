import SocialLinks from './SocialLinks';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200/20 dark:border-slate-700/20">
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
        <SocialLinks className="flex items-center space-x-4" />
      </nav>
    </header>
  );
}
