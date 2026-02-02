import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import QuizOption from "@/components/funnel/QuizOption";
import { useFunnel } from "@/contexts/FunnelContext";

const impactOptions = [
  { id: "fotos", label: "Evito tirar fotos porque tenho vergonha", icon: "📷" },
  { id: "parceiro", label: "Meu parceiro não me olha mais com desejo como antes", icon: "💔" },
  { id: "social", label: "Evito encontros sociais porque não me sinto bem comigo mesma", icon: "😔" },
  { id: "nenhuma", label: "Nenhuma das opções", icon: "👋" },
];

const Quiz5 = () => {
  const navigate = useNavigate();
  const { data, updateData } = useFunnel();

  const handleSelect = (optionId: string) => {
    updateData("weightImpact", optionId);
    navigate("/quiz6");
  };

  return (
    <QuizLayout progress={90}>
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-xl md:text-2xl font-bold text-funnel-title mb-1">
          {data.name || "Você"}
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-funnel-title">
          Como o seu peso{" "}
          <span className="text-funnel-accent">impacta sua vida?</span>
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {impactOptions.map((option, index) => (
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

export default Quiz5;
