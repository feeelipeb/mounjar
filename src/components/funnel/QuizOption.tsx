import { cn } from "@/lib/utils";

interface QuizOptionProps {
  label: string;
  onClick: () => void;
  image?: string;
  icon?: React.ReactNode;
  delay?: number;
}

const QuizOption = ({ label, onClick, image, icon, delay = 0 }: QuizOptionProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-4 py-4 bg-white rounded-xl border border-gray-200",
        "shadow-sm hover:shadow-md hover:border-funnel-accent/50",
        "transition-all duration-300 animate-fade-in-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-2xl">{icon}</span>}
        <span className="text-sm md:text-base font-medium text-funnel-title">{label}</span>
      </div>
      {image && (
        <img src={image} alt={label} className="w-16 h-16 object-cover rounded-lg" />
      )}
    </button>
  );
};

export default QuizOption;
