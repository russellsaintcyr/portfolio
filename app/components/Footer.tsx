import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2025 Russell Saint Cyr.</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            This site was built with Next.js, Tailwind CSS, and Google Stitch, leveraging Claude and Gemini to accelerate development.
            <a href="https://github.com/russellsaintcyr/portfolio" target="_blank">
              <span className="material-symbols-outlined text-primary text-3xl">code</span>
            </a>
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
