import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import { Button } from "@/components/ui/button";
import { useFunnel } from "@/contexts/FunnelContext";
import { Clipboard } from "lucide-react";

const Quiz13 = () => {
  const navigate = useNavigate();
  const { updateData } = useFunnel();
  const [goalWeight, setGoalWeight] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setGoalWeight(value);
  };

  const handleContinue = () => {
    if (goalWeight.trim()) {
      updateData("goalWeight", goalWeight);
      navigate("/quiz14");
    }
  };

  return (
    <QuizLayout progress={55}>
      <div className="text-center mb-2 animate-fade-in-up">
        <h1 className="text-xl font-bold text-funnel-title">
          Qual é o seu objetivo de peso (desejado)?
        </h1>
      </div>

      <p className="text-center text-sm text-funnel-subtitle mb-6 animate-fade-in-up">
        Isso nos ajudará a personalizar um plano especificamente para você
      </p>

      <div className="mb-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Clipboard className="w-5 h-5" />
          </div>
          <input
            type="text"
            inputMode="numeric"
            value={goalWeight}
            onChange={handleChange}
            placeholder="Digite seu peso desejado"
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-funnel-accent focus:outline-none text-funnel-title placeholder:text-gray-400"
          />
        </div>
      </div>

      <Button
        onClick={handleContinue}
        disabled={!goalWeight.trim()}
        className="w-full py-6 text-lg font-semibold bg-[#1B8B4B] hover:bg-[#167A40] rounded-xl shadow-[0_4px_0_0_#0F5C2E] active:shadow-[0_2px_0_0_#0F5C2E] active:translate-y-[2px] transition-all disabled:opacity-50 disabled:shadow-none mb-6"
      >
        Continuar
      </Button>

      <p className="text-center text-sm text-funnel-title font-medium animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        Baseado nisso, ajustaremos a dosagem ideal para os melhores resultados!
      </p>
    </QuizLayout>
  );
};

export default Quiz13;
