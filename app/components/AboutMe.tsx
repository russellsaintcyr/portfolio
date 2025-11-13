export default function AboutMe() {
  return (
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
  );
}
