import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import QuizOption from "@/components/funnel/QuizOption";
import { useFunnel } from "@/contexts/FunnelContext";

const sleepOptions = [
  { id: "menos5", label: "Menos de 5 horas", icon: "😵" },
  { id: "5a7", label: "Entre 5 e 7 horas", icon: "🤗" },
  { id: "7a9", label: "Entre 7 e 9 horas", icon: "👩" },
  { id: "mais9", label: "Mais de 9 horas", icon: "😶" },
];

const Quiz15 = () => {
  const navigate = useNavigate();
  const { updateData } = useFunnel();

  const handleSelect = (sleep: string) => {
    updateData("sleepHours", sleep);
    navigate("/quiz16");
  };

  return (
    <QuizLayout progress={75}>
      <div className="text-center mb-2 animate-fade-in-up">
        <h1 className="text-xl font-bold text-funnel-title">
          Quantas <span className="text-funnel-accent">horas de sono</span> você tem por noite?
        </h1>
      </div>

      <p className="text-center text-sm text-funnel-subtitle mb-6 animate-fade-in-up">
        A qualidade do seu sono impacta diretamente no seu emagrecimento!
      </p>

      <div className="space-y-3">
        {sleepOptions.map((option, index) => (
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

export default Quiz15;
