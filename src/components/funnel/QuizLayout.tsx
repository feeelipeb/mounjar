import { ReactNode } from "react";
import ProgressBar from "./ProgressBar";
import logo from "@/assets/logo.webp";

interface QuizLayoutProps {
  children: ReactNode;
  progress: number;
}

const QuizLayout = ({ children, progress }: QuizLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Mounjaro de Pobre" className="h-16 w-auto" />
        </div>
        <ProgressBar progress={progress} />
        {children}
      </div>
    </div>
  );
};

export default QuizLayout;
