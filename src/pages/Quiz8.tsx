import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import { Button } from "@/components/ui/button";

const Quiz8 = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navegar para próxima etapa
    console.log("Protocolo apresentado, continuar para próxima etapa");
  };

  return (
    <QuizLayout progress={70}>
      <div className="text-center mb-6 animate-fade-in-up">
        <h1 className="text-xl font-bold text-funnel-title">Nosso protocolo</h1>
        <h2 className="text-xl font-bold text-funnel-accent">Resolve isso para você!</h2>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <h3 className="text-center text-lg font-bold text-[#1B8B4B] mb-6 uppercase tracking-wide">
          Como funciona o<br />Mounjaro de Pobre
        </h3>

        {/* Ciclo visual simplificado */}
        <div className="relative flex flex-col items-center gap-4">
          {/* Você */}
          <div className="flex items-center gap-2">
            <div className="text-center">
              <div className="text-4xl mb-1">🧍‍♀️</div>
              <span className="text-sm font-medium text-funnel-title">Você</span>
            </div>
            <span className="text-2xl text-red-500">➡️</span>
            <div className="text-center">
              <div className="text-4xl mb-1">🍵</div>
              <span className="text-sm font-medium text-funnel-title">Mounjaro Pronto</span>
            </div>
          </div>

          {/* Seta para baixo */}
          <span className="text-2xl text-red-500">⬇️</span>

          {/* Queima de gordura */}
          <div className="text-center">
            <div className="text-4xl mb-1">🔥</div>
            <span className="text-sm font-medium text-funnel-title">Mounjaro ativa a sua<br />queima de gordura</span>
          </div>

          {/* Seta para baixo */}
          <span className="text-2xl text-red-500">⬇️</span>

          {/* Seu objetivo */}
          <div className="text-center">
            <div className="text-4xl mb-1">💪</div>
            <span className="text-sm font-medium text-funnel-title">Seu objetivo</span>
          </div>
        </div>
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
