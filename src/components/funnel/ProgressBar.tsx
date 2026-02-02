interface ProgressBarProps {
  progress: number; // 0-100
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
      <div
        className="h-full bg-funnel-accent transition-all duration-500 ease-out rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
