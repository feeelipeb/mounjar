import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.webp";
import presellImage from "@/assets/presell.webp";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useButtonTracking } from "@/hooks/useButtonTracking";

const Presell = () => {
  usePageTracking();
  const navigate = useNavigate();
  const { trackButtonClick } = useButtonTracking();

  const handleStart = () => {
    trackButtonClick('presell_start', 'Começar o Teste', '/');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Mounjaro de Pobre" className="h-16 w-auto" />
        </div>

        {/* Progress bar (subtle, not green) */}
        <div className="w-full h-2 bg-muted rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: '5%' }} />
        </div>

        {/* Main image */}
        <div className="rounded-xl overflow-hidden mb-8">
          <img
            src={presellImage}
            alt="Perca até 10kg de gordura em 30 dias - Nova receita do Mounjaro de Pobre"
            className="w-full h-auto"
          />
        </div>

        {/* CTA Button */}
        <button
          onClick={handleStart}
          className="w-full py-4 rounded-full bg-[#1B8C3D] hover:bg-[#167a34] text-white text-lg font-semibold transition-colors mb-4"
        >
          Começar o Teste
        </button>

        {/* Urgency badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 bg-red-500 text-white text-sm font-semibold px-5 py-2 rounded-full">
            🔒 Apenas 1 consulta por pessoa
          </span>
        </div>
      </div>
    </div>
  );
};

export default Presell;
