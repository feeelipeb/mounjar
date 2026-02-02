import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/funnel/QuizLayout";
import { Button } from "@/components/ui/button";
import testimonialImage from "@/assets/testimonial-antes-depois.jpg";
import perfilFernanda from "@/assets/perfil-fernanda.jpg";

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
      <div className="rounded-2xl overflow-hidden mb-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <img 
          src={testimonialImage}
          alt="Antes e Depois - Fernanda" 
          className="w-full h-auto rounded-2xl"
        />
      </div>

      {/* Testimonial Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={perfilFernanda}
            alt="Fernanda Oliveira"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-funnel-title">Fernanda Oliveira</h3>
            <p className="text-xs text-funnel-subtitle">Porto Alegre, RS</p>
          </div>
        </div>
        
        <p className="text-sm text-funnel-title leading-relaxed mb-4">
          Eu já tinha tentado de tudo para emagrecer, mas nada funcionava. Depois de incluir a fórmula do Mounjaro de pobre na minha rotina, perdi 11kg sem mudar nada na minha alimentação! O mais incrível é que minha fome e ansiedade diminuíram naturalmente!
        </p>

        {/* Stars */}
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-400 text-xl">⭐</span>
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
