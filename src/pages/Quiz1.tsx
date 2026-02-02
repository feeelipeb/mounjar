import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import QuizOption from "@/components/funnel/QuizOption";
import { useFunnel } from "@/contexts/FunnelContext";

const weightOptions = [
  { id: "ate-5", label: "Até 5 kg" },
  { id: "6-10", label: "De 6 a 10 kg" },
  { id: "11-15", label: "De 11 a 15 kg" },
  { id: "16-20", label: "De 16 a 20 kg" },
  { id: "mais-20", label: "Mais de 20 kg" },
];

const Quiz1 = () => {
  const navigate = useNavigate();
  const { updateData } = useFunnel();

  const handleSelect = (optionId: string) => {
    updateData("weightGoal", optionId);
    navigate("/quiz2");
  };

  return (
    <QuizLayout progress={20}>
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-xl md:text-2xl font-bold text-funnel-title mb-1">
          Quantos quilos você
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-funnel-accent">
          deseja perder?
        </h2>
        <p className="text-sm text-funnel-subtitle mt-2">
          Escolha a opção abaixo.
        </p>
      </div>

      <p className="text-center text-sm text-funnel-title underline mb-6 px-4">
        O protocolo Mounjaro de Pobre ajuda a eliminar gordura de forma acelerada.
      </p>

      <div className="flex flex-col gap-3">
        {weightOptions.map((option, index) => (
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

export default Quiz1;
