import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import { useFunnel } from "@/contexts/FunnelContext";

const obstacleOptions = [
  { 
    id: "tempo", 
    title: "Falta de tempo", 
    subtitle: "Rotina agitada",
    icon: "⏰"
  },
  { 
    id: "autocontrole", 
    title: "Autocontrole", 
    subtitle: "Dificuldade em resistir a tentações alimentares",
    icon: "🤖"
  },
  { 
    id: "financeiro", 
    title: "Financeiro", 
    subtitle: "Achar opções saudáveis mais caras do que alimentos processados",
    icon: "💸"
  },
];

const Quiz7 = () => {
  const navigate = useNavigate();
  const { updateData } = useFunnel();

  const handleSelect = (optionId: string) => {
    updateData("obstacle", optionId);
    navigate("/quiz8");
  };

  return (
    <QuizLayout progress={60}>
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-xl md:text-2xl font-bold text-funnel-title">
          O que mais te <span className="text-funnel-accent">impede</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-funnel-accent">
          de emagrecer?
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {obstacleOptions.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className="w-full flex items-center gap-4 px-4 py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-funnel-accent/50 transition-all duration-300 animate-fade-in-up text-left"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <span className="text-3xl">{option.icon}</span>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-funnel-title">{option.title}</span>
              <span className="text-sm text-gray-500">{option.subtitle}</span>
            </div>
          </button>
        ))}
      </div>
    </QuizLayout>
  );
};

export default Quiz7;
