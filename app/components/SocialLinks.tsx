import { FaLinkedin } from 'react-icons/fa';

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className = "flex items-center space-x-6" }: SocialLinksProps) {
  return (
    <div className={className}>
      <a href="https://www.linkedin.com/in/russellsaintcyr/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <FaLinkedin size={24} />
      </a>
    </div>
  );
}
