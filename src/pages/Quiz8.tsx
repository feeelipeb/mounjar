import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import { Button } from "@/components/ui/button";
import comoFunciona from "@/assets/como-funciona.png";

const Quiz8 = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/quiz9");
  };

  return (
    <QuizLayout progress={70}>
      <div className="text-center mb-6 animate-fade-in-up">
        <h1 className="text-xl font-bold text-funnel-title">Nosso protocolo</h1>
        <h2 className="text-xl font-bold text-funnel-accent">Resolve isso para você!</h2>
      </div>

      <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <img 
          src={comoFunciona} 
          alt="Como funciona o Mounjaro de Pobre" 
          className="w-full max-w-sm mx-auto"
        />
      </div>

      <p className="text-center text-sm mb-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <span className="text-funnel-accent font-semibold">Mounjaro de pobre</span>{" "}
        age enquanto você dorme,{" "}
        <span className="text-funnel-accent font-semibold">queimando gordura</span>{" "}
        de forma <span className="font-semibold">acelerada!</span>
      </p>

      <Button
        onClick={handleContinue}
        className="w-full py-6 text-lg font-semibold bg-[#1B8B4B] hover:bg-[#167A40] rounded-xl shadow-[0_4px_0_0_#0F5C2E] active:shadow-[0_2px_0_0_#0F5C2E] active:translate-y-[2px] transition-all"
      >
        Continuar
      </Button>
    </QuizLayout>
  );
};

export default Quiz8;
