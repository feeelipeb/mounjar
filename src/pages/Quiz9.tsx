import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import { Button } from "@/components/ui/button";
import { useFunnel } from "@/contexts/FunnelContext";

const benefits = [
  { id: "emagrecer", label: "Emagrecer sem esforço e sem efeito sanfona" },
  { id: "sono", label: "Sono mais profundo" },
  { id: "energia", label: "Mais energia e disposição ao longo do dia" },
  { id: "autoestima", label: "Aumento da autoestima e confiança" },
  { id: "estresse", label: "Redução do estresse e ansiedade" },
];

const Quiz9 = () => {
  const navigate = useNavigate();
  const { updateData } = useFunnel();
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);

  const toggleBenefit = (id: string) => {
    setSelectedBenefits((prev) =>
      prev.includes(id)
        ? prev.filter((b) => b !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedBenefits.length > 0) {
      updateData("benefits", selectedBenefits.join(","));
      navigate("/quiz10");
    }
  };

  return (
    <QuizLayout progress={75}>
      <div className="text-center mb-2 animate-fade-in-up">
        <h1 className="text-xl font-bold text-funnel-title">
          Quais desses benefícios <span className="text-funnel-accent">você gostaria de ter?</span>
        </h1>
      </div>

      <p className="text-center text-sm text-funnel-subtitle mb-6 animate-fade-in-up">
        Vamos personalizar a sua fórmula para maximizar os resultados.
      </p>

      <div className="space-y-3 mb-6">
        {benefits.map((benefit, index) => (
          <button
            key={benefit.id}
            onClick={() => toggleBenefit(benefit.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all animate-fade-in-up ${
              selectedBenefits.includes(benefit.id)
                ? "border-funnel-accent bg-funnel-accent/5"
                : "border-gray-200 bg-white hover:border-funnel-accent/50"
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-2xl">👉</span>
            <span className="flex-1 text-left text-funnel-title font-medium">
              {benefit.label}
            </span>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedBenefits.includes(benefit.id)
                  ? "border-funnel-accent bg-funnel-accent"
                  : "border-gray-300"
              }`}
            >
              {selectedBenefits.includes(benefit.id) && (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>

      <Button
        onClick={handleContinue}
        disabled={selectedBenefits.length === 0}
        className="w-full py-6 text-lg font-semibold bg-[#1B8B4B] hover:bg-[#167A40] rounded-xl shadow-[0_4px_0_0_#0F5C2E] active:shadow-[0_2px_0_0_#0F5C2E] active:translate-y-[2px] transition-all disabled:opacity-50 disabled:shadow-none"
      >
        Continuar
      </Button>
    </QuizLayout>
  );
};

export default Quiz9;
