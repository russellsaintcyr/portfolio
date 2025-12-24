import Link from 'next/link';
import SocialLinks from './SocialLinks';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200/20 dark:border-slate-700/20">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors">
          Russell Saint Cyr
        </Link>
        <SocialLinks className="flex items-center space-x-4" />
      </nav>
    </header>
  );
}
