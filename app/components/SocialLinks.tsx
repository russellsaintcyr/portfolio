import { FaLinkedin, FaGithub } from 'react-icons/fa';

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className = "flex items-center space-x-6" }: SocialLinksProps) {
  return (
    <div className={className}>
      <a href="https://github.com/russellsaintcyr" target="_blank" rel="noopener noreferrer">
        <FaGithub size={24} />
      </a>
      <a href="https://www.linkedin.com/in/russellsaintcyr/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin size={24} />
      </a>
    </div>
  );
}
