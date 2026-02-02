import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import QuizOption from "@/components/funnel/QuizOption";
import { useFunnel } from "@/contexts/FunnelContext";

const appearanceOptions = [
  { id: "acima-peso", label: "Não, porque me sinto acima do peso", icon: "😢" },
  { id: "melhorar-saude", label: "Sim, mas sei que posso melhorar minha saúde", icon: "💖" },
  { id: "bem-estar", label: "Não, gostaria de perder peso para melhorar meu bem-estar", icon: "😞" },
];

const Quiz6 = () => {
  const navigate = useNavigate();
  const { updateData } = useFunnel();

  const handleSelect = (optionId: string) => {
    updateData("appearance", optionId);
    navigate("/quiz7");
  };

  return (
    <QuizLayout progress={30}>
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-xl md:text-2xl font-bold text-funnel-title">
          Você está realmente <span className="text-funnel-accent">feliz</span> com{" "}
          <span className="text-funnel-accent">sua aparência?</span>
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        {appearanceOptions.map((option, index) => (
          <QuizOption
            key={option.id}
            label={option.label}
            icon={option.icon}
            onClick={() => handleSelect(option.id)}
            delay={index * 80}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Quiz6;
