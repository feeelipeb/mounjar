import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import QuizOption from "@/components/funnel/QuizOption";
import { useFunnel } from "@/contexts/FunnelContext";

const areaOptions = [
  { id: "culotes", label: "Região dos Culotes" },
  { id: "coxas", label: "Região das Coxas" },
  { id: "abdomen", label: "Região do Abdômen (barriga)" },
  { id: "gluteos", label: "Região dos Glúteos" },
  { id: "bracos", label: "Região dos Braços" },
];

const Quiz3 = () => {
  const navigate = useNavigate();
  const { updateData } = useFunnel();

  const handleSelect = (optionId: string) => {
    updateData("targetArea", optionId);
    navigate("/quiz4");
  };

  return (
    <QuizLayout progress={50}>
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-xl md:text-2xl font-bold text-funnel-title">
          Em qual área do seu corpo
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-funnel-title">
          você gostaria de{" "}
          <span className="text-funnel-accent">reduzir</span>
        </h2>
        <h2 className="text-xl md:text-2xl font-bold text-funnel-accent">
          mais gordura?
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {areaOptions.map((option, index) => (
          <QuizOption
            key={option.id}
            label={option.label}
            onClick={() => handleSelect(option.id)}
            delay={index * 80}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Quiz3;
