import Project from './Project';

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
          <Project
            backgroundImage="now_playing.png"
            title="Spotify playlist rater"
            description="A tool allowing users to manage playlists on Spotify, with full playback funtionality. Built with Angular, but being redesigned in React Native and Firebase."
            skills={['Angular', 'React Native', 'Node.js', 'Express', 'Firebase', 'Bootstrap', 'Spotify']}
            showGitHubRepo={true}
            githubRepoUrl="https://github.com/russellsaintcyr/playlist-webapp"
          />
          <Project
            backgroundImage="worldweary.png"
            title="World Weary"
            description="A website for Ireland's only independent advice column. Included the ability for users to submit and search for questions, and for adminstrators to manage and respond to submissions."
            skills={['JSP', 'Java', 'MySQL']}
          />
          <Project
            backgroundImage="futurecults.png"
            title="Futurecults"
            description="An artist's website for users to read fictional stories of characters selected on a map of Los Angeles, with accompanying songs per character. Included an advanced adminstrative website for managing and styling content."
            skills={['Angular', 'MongoDB', 'Bootstrap', 'Google Maps API']}
          />
        </div>
      </div>
    </section>
  );
}
