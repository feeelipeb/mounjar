import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import { useFunnel } from "@/contexts/FunnelContext";
import bodyEmForma from "@/assets/body-fit.png";
import bodyNatural from "@/assets/body-nat.png";

const Quiz19 = () => {
  const navigate = useNavigate();
  const { updateData } = useFunnel();

  const handleSelect = (value: string) => {
    updateData("dreamBody", value);
    navigate("/quiz20");
  };

  const options = [
    { label: "Em Forma", image: bodyEmForma, value: "em-forma" },
    { label: "Natural", image: bodyNatural, value: "natural" },
  ];

  return (
    <QuizLayout progress={95}>
      <div className="mt-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-funnel-title mb-2">
          Qual o <span className="underline">corpo</span> dos
        </h1>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          seus <span className="text-primary">sonhos</span>?
        </h1>
        <p className="text-sm text-muted-foreground underline mb-8">
          Escolha a opção abaixo:
        </p>

        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl bg-card border-2 border-transparent shadow-funnel transition-all duration-300 ease-out hover:shadow-funnel-hover hover:bg-funnel-card-hover hover:border-funnel-card-border-hover hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-50">
                <img
                  src={option.image}
                  alt={option.label}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-base font-semibold text-card-foreground transition-colors group-hover:text-primary">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </QuizLayout>
  );
};

export default Quiz19;
