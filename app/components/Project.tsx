import ImageWrapper from './ImageWrapper';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  skills: string[];
  showGitHubRepo?: boolean;
  githubRepoUrl?: string;
  showLiveDemo?: boolean;
  liveDemoUrl?: string;
}

export default function Project({
  imageSrc,
  imageAlt,
  title,
  description,
  skills,
  showGitHubRepo = false,
  githubRepoUrl,
  showLiveDemo = false,
  liveDemoUrl,
}: ProjectProps) {
  return (
    <div className="group flex flex-col gap-4 bg-white dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <ImageWrapper
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
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
          <a 
            className="flex items-center gap-2 text-primary font-semibold text-sm transition-all duration-200 hover:text-primary/80 hover:underline hover:scale-105 active:scale-95 active:text-primary/60" 
            href={liveDemoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaExternalLinkAlt className="w-3 h-3" />
            Live Demo
          </a>
        )}
        {showGitHubRepo && githubRepoUrl && (
          <a 
            className="flex items-center gap-2 text-primary font-semibold text-sm transition-all duration-200 hover:text-primary/80 hover:underline hover:scale-105 active:scale-95 active:text-primary/60" 
            href={githubRepoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaGithub className="w-3 h-3" />
            GitHub Repo
          </a>
        )}
      </div>
    </div>
  );
}
