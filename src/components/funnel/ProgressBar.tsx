interface ProgressBarProps {
  progress: number; // 0-100
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
      <div
        className="h-full transition-all duration-500 ease-out rounded-full"
        style={{ width: `${progress}%`, backgroundColor: '#1B8B4B' }}
      />
    </div>
  );
};

export default ProgressBar;
