import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="bg-slate-50/90 dark:bg-slate-900/90 border-t border-slate-200/20 dark:border-slate-700/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2025 Russell Saint Cyr.</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            This site was built with Next.js, Tailwind CSS, Cursor, Claude and Gemini.
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
