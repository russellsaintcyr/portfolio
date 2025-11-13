export default function Projects() {
  return (
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
                href="https://github.com/russellsaintcyr/playlist-webapp" target="_blank">GitHub Repo</a>
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
  );
}
