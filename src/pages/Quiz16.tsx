import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import QuizOption from "@/components/funnel/QuizOption";
import { useFunnel } from "@/contexts/FunnelContext";

const waterOptions = [
  { id: "cafe", label: "Bebo apenas café ou chá", icon: "☕" },
  { id: "1a2", label: "1-2 copos por dia", icon: "🥛" },
  { id: "2a6", label: "2-6 copos por dia", icon: "🥛" },
  { id: "mais6", label: "Mais de 6 copos", icon: "🥛" },
];

const Quiz16 = () => {
  const navigate = useNavigate();
  const { updateData } = useFunnel();

  const handleSelect = (water: string) => {
    updateData("waterIntake", water);
    // Navegar para próxima etapa
    console.log("Quiz16 completed");
  };

  return (
    <QuizLayout progress={70}>
      <div className="text-center mb-2 animate-fade-in-up">
        <h1 className="text-xl font-bold text-funnel-title">
          Quantos <span className="text-funnel-accent">copos de água</span> você bebe por dia?
        </h1>
      </div>

      <p className="text-center text-sm text-funnel-subtitle mb-6 animate-fade-in-up">
        Seu nível de hidratação também influencia na sua perda de peso.
      </p>

      <div className="space-y-3">
        {waterOptions.map((option, index) => (
          <QuizOption
            key={option.id}
            label={option.label}
            icon={<span className="text-2xl">{option.icon}</span>}
            onClick={() => handleSelect(option.id)}
            delay={index * 50}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Quiz16;
