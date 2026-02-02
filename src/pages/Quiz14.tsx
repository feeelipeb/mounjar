import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import QuizOption from "@/components/funnel/QuizOption";
import { useFunnel } from "@/contexts/FunnelContext";

const routines = [
  { id: "agitada", label: "Trabalho fora e tenho uma rotina agitada", icon: "🧑‍💼" },
  { id: "flexivel", label: "Trabalho em casa e tenho uma rotina flexível", icon: "🤗" },
  { id: "familia", label: "Fico em casa cuidando da família", icon: "👩" },
  { id: "outro", label: "Outro", icon: "😶" },
];

const Quiz14 = () => {
  const navigate = useNavigate();
  const { updateData } = useFunnel();

  const handleSelect = (routine: string) => {
    updateData("routine", routine);
    navigate("/quiz15");
  };

  return (
    <QuizLayout progress={70}>
      <div className="text-center mb-2 animate-fade-in-up">
        <h1 className="text-xl font-bold text-funnel-title">
          Como é o seu dia a dia?
        </h1>
      </div>

      <p className="text-center text-sm text-funnel-subtitle mb-6 animate-fade-in-up">
        Sua rotina diária também faz diferença!
      </p>

      <div className="space-y-3">
        {routines.map((routine, index) => (
          <QuizOption
            key={routine.id}
            label={routine.label}
            icon={<span className="text-2xl">{routine.icon}</span>}
            onClick={() => handleSelect(routine.id)}
            delay={index * 50}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Quiz14;
