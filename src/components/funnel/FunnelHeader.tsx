interface FunnelHeaderProps {
  title: string;
  subtitle: string;
}

const FunnelHeader = ({ title, subtitle }: FunnelHeaderProps) => {
  return (
    <div className="text-center mb-8 animate-fade-in-up">
      <h1 className="text-2xl md:text-3xl font-bold text-funnel-title mb-2">
        {title}
      </h1>
      <p className="text-base md:text-lg text-funnel-subtitle">
        {subtitle}
      </p>
    </div>
  );
};

export default FunnelHeader;
