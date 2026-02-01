import { cn } from "@/lib/utils";

interface AgeCardProps {
  image: string;
  label: string;
  onClick: () => void;
  delay?: number;
}

const AgeCard = ({ image, label, onClick, delay = 0 }: AgeCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-3 p-4 rounded-2xl",
        "bg-card border-2 border-transparent",
        "shadow-funnel transition-all duration-300 ease-out",
        "hover:shadow-funnel-hover hover:bg-funnel-card-hover hover:border-funnel-card-border-hover",
        "hover:-translate-y-1",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "animate-fade-in-up cursor-pointer w-full"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-xl">
        <img
          src={image}
          alt={`Mulher na faixa etária ${label}`}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <span className="text-base font-semibold text-card-foreground transition-colors group-hover:text-primary">
        {label}
      </span>
    </button>
  );
};

export default AgeCard;
