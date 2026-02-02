import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import { Button } from "@/components/ui/button";
import { useFunnel } from "@/contexts/FunnelContext";
import { Clipboard } from "lucide-react";

const Quiz12 = () => {
  const navigate = useNavigate();
  const { updateData } = useFunnel();
  const [height, setHeight] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setHeight(value);
  };

  const handleContinue = () => {
    if (height.trim()) {
      updateData("height", height);
      navigate("/quiz13");
    }
  };

  return (
    <QuizLayout progress={50}>
      <div className="text-center mb-2 animate-fade-in-up">
        <h1 className="text-xl font-bold text-funnel-title">
          Qual é a sua <span className="text-funnel-accent">altura?</span>
        </h1>
      </div>

      <p className="text-center text-sm text-funnel-subtitle mb-6 animate-fade-in-up">
        Isso nos ajudará a calcular a quantidade exata do Mounjaro de pobre para seu corpo.
      </p>

      <div className="mb-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Clipboard className="w-5 h-5" />
          </div>
          <input
            type="text"
            inputMode="numeric"
            value={height}
            onChange={handleChange}
            placeholder="Digite sua altura aqui"
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-funnel-accent focus:outline-none text-funnel-title placeholder:text-gray-400"
          />
        </div>
      </div>

      <Button
        onClick={handleContinue}
        disabled={!height.trim()}
        className="w-full py-6 text-lg font-semibold bg-[#1B8B4B] hover:bg-[#167A40] rounded-xl shadow-[0_4px_0_0_#0F5C2E] active:shadow-[0_2px_0_0_#0F5C2E] active:translate-y-[2px] transition-all disabled:opacity-50 disabled:shadow-none"
      >
        Continuar
      </Button>
    </QuizLayout>
  );
};

export default Quiz12;
