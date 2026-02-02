import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import QuizOption from "@/components/funnel/QuizOption";
import { useFunnel } from "@/contexts/FunnelContext";

import bodyRegular from "@/assets/body-regular.png";
import bodyFlacido from "@/assets/body-flacido.png";
import bodySobrepeso from "@/assets/body-sobrepeso.png";

const bodyOptions = [
  { id: "regular", label: "Regular", image: bodyRegular },
  { id: "flacido", label: "Flácido", image: bodyFlacido },
  { id: "sobrepeso", label: "Sobrepeso", image: bodySobrepeso },
];

const Quiz2 = () => {
  const navigate = useNavigate();
  const { updateData } = useFunnel();

  const handleSelect = (optionId: string) => {
    updateData("bodyType", optionId);
    navigate("/quiz3");
  };

  return (
    <QuizLayout progress={10}>
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-xl md:text-2xl font-bold text-funnel-title">
          Como você classificaria seu{" "}
          <span className="text-funnel-accent">corpo hoje?</span>
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        {bodyOptions.map((option, index) => (
          <QuizOption
            key={option.id}
            label={option.label}
            image={option.image}
            onClick={() => handleSelect(option.id)}
            delay={index * 80}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Quiz2;
