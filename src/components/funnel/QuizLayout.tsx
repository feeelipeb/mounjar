import { ReactNode } from "react";
import ProgressBar from "./ProgressBar";

interface QuizLayoutProps {
  children: ReactNode;
  progress: number;
}

const QuizLayout = ({ children, progress }: QuizLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md mx-auto">
        <ProgressBar progress={progress} />
        {children}
      </div>
    </div>
  );
};

export default QuizLayout;
