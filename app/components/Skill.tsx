interface SkillProps {
  iconName: string;
  title: string;
  description: string;
}

export default function Skill({ iconName, title, description }: SkillProps) {
  return (
    <div className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 flex-col">
      <span className="material-symbols-outlined text-primary text-3xl">{iconName}</span>
      <div className="flex flex-col gap-1">
        <h3 className="text-gray-900 dark:text-white text-base font-bold">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">{description}</p>
      </div>
    </div>
  );
}
