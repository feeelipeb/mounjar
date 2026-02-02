import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import { Button } from "@/components/ui/button";

const Quiz10 = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/quiz11");
  };

  return (
    <QuizLayout progress={85}>
      <div className="text-center mb-4 animate-fade-in-up">
        <h1 className="text-xl font-bold text-funnel-title">
          🔥 Histórias Reais de Transformação!
        </h1>
        <p className="text-sm text-funnel-subtitle mt-1">
          📍 Depoimento: Fernanda – Porto Alegre-RS
        </p>
      </div>

      {/* Before/After Image */}
      <div className="relative rounded-2xl overflow-hidden mb-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=300&fit=crop" 
            alt="Antes" 
            className="w-1/2 h-48 object-cover inline-block"
          />
          <img 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop" 
            alt="Depois" 
            className="w-1/2 h-48 object-cover inline-block"
          />
          <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-sm">
            ANTES
          </div>
          <div className="absolute bottom-4 right-4 bg-[#1B8B4B] text-white px-3 py-1 rounded-lg font-bold text-sm">
            DEPOIS
          </div>
        </div>
      </div>

      {/* Testimonial Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
            <span className="text-white text-lg">👩</span>
          </div>
          <div>
            <h3 className="font-bold text-funnel-title">Fernanda Oliveira</h3>
            <p className="text-xs text-funnel-subtitle">Porto Alegre, RS</p>
          </div>
        </div>
        
        <p className="text-sm text-funnel-title leading-relaxed mb-3">
          Eu já tinha tentado de tudo para emagrecer, mas nada funcionava. Depois de incluir a fórmula do Mounjaro de pobre na minha rotina, perdi 11kg sem mudar nada na minha alimentação! O mais incrível é que minha fome e ansiedade diminuíram naturalmente!
        </p>

        {/* Stars */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-400 text-lg">⭐</span>
          ))}
        </div>
      </div>

      <Button
        onClick={handleContinue}
        className="w-full py-6 text-lg font-semibold bg-[#1B8B4B] hover:bg-[#167A40] rounded-xl shadow-[0_4px_0_0_#0F5C2E] active:shadow-[0_2px_0_0_#0F5C2E] active:translate-y-[2px] transition-all"
      >
        Continuar
      </Button>
    </QuizLayout>
  );
};

export default Quiz10;
