interface ProjectProps {
  backgroundImage: string;
  title: string;
  description: string;
  skills: string[];
  showGitHubRepo?: boolean;
  githubRepoUrl?: string;
  showLiveDemo?: boolean;
  liveDemoUrl?: string;
}

export default function Project({
  backgroundImage,
  title,
  description,
  skills,
  showGitHubRepo = false,
  githubRepoUrl,
  showLiveDemo = false,
  liveDemoUrl,
}: ProjectProps) {
  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
      <div
        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
        style={{
          backgroundImage: `url("${backgroundImage}")`
        }}
      >
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-gray-900 dark:text-white text-xl font-bold">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill) => (
            <span key={skill} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 mt-2">
        {showLiveDemo && liveDemoUrl && (
          <a className="text-primary font-semibold text-sm" href={liveDemoUrl} target="_blank" rel="noopener noreferrer">
            Live Demo
          </a>
        )}
        {showGitHubRepo && githubRepoUrl && (
          <a className="text-primary font-semibold text-sm" href={githubRepoUrl} target="_blank" rel="noopener noreferrer">
            GitHub Repo
          </a>
        )}
      </div>
    </div>
  );
}
