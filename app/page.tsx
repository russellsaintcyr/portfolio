import Image from "next/image";
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <div className="relative w-full overflow-x-hidden">

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

        {/* Main */}
        <main>
          <section className="container mx-auto px-4 py-8 md:py-8" id="home">
            <div className="flex flex-col gap-6 @container">
              <div className="flex flex-col gap-8 text-center items-center">
                <div className="flex flex-col gap-2">
                  <h1
                    className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl">
                    Russell Saint Cyr</h1>
                  <h1
                    className="text-gray-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
                    Senior Frontend Developer and Architect</h1>
                  <h2
                    className="text-gray-600 dark:text-gray-300 text-lg font-normal leading-normal md:text-xl max-w-3xl mx-auto">
                    Senior Frontend Developer | 20+ Years Building Scalable Applications
                  </h2>
                </div>
                {/* <a className="flex min-w-[84px] max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
                  href="#projects">
                  <span className="truncate">View My Work</span>
                </a> */}
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section className="container mx-auto px-4 py-8 md:py-8" id="projects">
            <div className="flex flex-col gap-10 @container">
              <div className="flex flex-col gap-4 text-center items-center">
                <h2
                  className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight md:text-4xl">
                  Featured Projects</h2>
                <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal max-w-3xl">Here
                  are some of the projects I'm proud to have worked on. Each project showcases my skills in
                  creating robust and user-friendly web solutions.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Spotify playlist rater */}
                <div
                  className="flex flex-col gap-4 bg-white dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                    data-alt="Abstract gradient for project management tool thumbnail"
                    style={{
                      backgroundImage: 'url("now_playing.png")'
                    }}
                  >
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-900 dark:text-white text-xl font-bold">Spotify playlist rater</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">A tool allowing users to manage playlists on Spotify,
                      with full playback funtionality. Built with Angular, but being redesigned in React Native and Firebase.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">Angular</span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">React Native</span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">Node.js</span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">Express</span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">Firebase</span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">Bootstrap</span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">Spotify</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    {/* <span className="text-primary font-semibold text-sm">Live Demo</span> */}
                    <a className="text-primary font-semibold text-sm"
                      href="https://github.com/russellsaintcyr/spotify-playlist-rater" target="_blank">GitHub Repo</a>
                  </div>
                </div>

                {/* Worldweary */}
                <div
                  className="flex flex-col gap-4 bg-white dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                    data-alt="Abstract gradient for data visualization dashboard thumbnail"
                    style={{
                      backgroundImage: 'url("worldweary.png")'
                    }}
                  >
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-900 dark:text-white text-xl font-bold">World Weary
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      A website for Ireland's only independent advice column.
                      Included the ability for users to submit and search for questions,
                      and for adminstrators to manage and respond to submissions.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">JSP</span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">Java</span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">MySQL</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    {/* <span className="text-primary font-semibold text-sm">Live Demo</span> */}
                    {/* <span className="text-primary font-semibold text-sm">GitHub Repo</span> */}
                  </div>
                </div>

                {/* Futurecults website */}
                <div
                  className="flex flex-col gap-4 bg-white dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                    data-alt="Abstract gradient for e-commerce platform thumbnail"
                    style={{
                      backgroundImage: 'url("futurecults.png")'
                    }}
                  >
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-900 dark:text-white text-xl font-bold">Futurecults</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">An artist's website for users to read fictional stories of
                      characters selected on a map of Los Angeles, with accompanying songs per character. Included an advanced adminstrative
                      website for managing and styling content.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">Angular</span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">MongoDB</span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">Bootstrap</span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">Google Maps API</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    {/* <span className="text-primary font-semibold text-sm">Live Demo</span> */}
                    {/* <span className="text-primary font-semibold text-sm">GitHub Repo</span> */}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Me */}
          <section className="container mx-auto px-4 py-8 md:py-8" id="about">
            <div className="flex flex-col lg:flex-row items-center gap-12 @container">
              <div className="w-full lg:w-1/3 flex justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-center bg-no-repeat bg-cover rounded-full"
                  data-alt="Professional headshot of Russell Saint Cyr"
                  style={{
                    backgroundImage: 'url("profile_photo.jpg")'
                  }}
                >
                </div>
              </div>
              <div className="w-full lg:w-2/3 flex flex-col gap-6">
                <div className="flex flex-col gap-4 text-center lg:text-left">
                  <h2
                    className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight md:text-4xl">
                    About Me</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-relaxed">
                    I am a Senior Frontend Developer with 20+ years crafting elegant solutions across the technology stack.
                    I transform complex requirements into scalable, performant applications using Angular, React and React Native,
                    modifying the backend as needed. My architectural approach has modernized legacy systems and delivered
                    measurable wins—including 30% smaller bundle sizes and 15% higher Lighthouse scores. I thrive at the
                    union of technical excellence and user experience, guiding teams to build systems that are
                    well-designed and intuitive.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div
                    className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 flex-col">
                    <span className="material-symbols-outlined text-primary text-3xl">code</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-900 dark:text-white text-base font-bold">TypeScript / JavaScript</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">Advanced proficiency
                        in modern scripting (ES6+).</p>
                    </div>
                  </div>
                  <div
                    className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 flex-col">
                    <span className="material-symbols-outlined text-primary text-3xl">code_blocks</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-900 dark:text-white text-base font-bold">Angular / React</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">Building dynamic
                        user interfaces with frameworks like Angular and React.</p>
                    </div>
                  </div>
                  <div
                    className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 flex-col">
                    <span className="material-symbols-outlined text-primary text-3xl">developer_mode</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-900 dark:text-white text-base font-bold">React Native</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">Developing hybrid applications from a single codebase
                        for Android, iOS and web.
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 flex-col">
                    <span className="material-symbols-outlined text-primary text-3xl">hub</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-900 dark:text-white text-base font-bold">Node.js</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">Developing scalable
                        server-side applications.</p>
                    </div>
                  </div>
                  <div
                    className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 flex-col">
                    <span className="material-symbols-outlined text-primary text-3xl">bug_report</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-900 dark:text-white text-base font-bold">Testing</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">Leading efforts to automate testing with
                        Cypress, Playwright and Vitest.</p>
                    </div>
                  </div>
                  <div
                    className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 flex-col">
                    <span className="material-symbols-outlined text-primary text-3xl">cloud</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-900 dark:text-white text-base font-bold">AWS</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">Deploying and
                        managing applications on AWS.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-white dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                © 2025 Russell Saint Cyr.</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                This site was built with Next.js, Tailwind CSS, and Google Stitch, leveraging Google Gemini to accelerate development.
                <a href="https://github.com/russellsaintcyr/portfolio" target="_blank">
                  <span className="material-symbols-outlined text-primary text-3xl">code</span>
                </a>
              </p>
              <div className="flex items-center space-x-6">
                <a href="https://github.com/russellsaintcyr" target="_blank" >
                  <FaGithub size={24} />
                </a>
                <a href="https://www.linkedin.com/in/russellsaintcyr/" target="_blank">
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
