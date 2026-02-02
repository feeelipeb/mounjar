import { useNavigate } from "react-router-dom";
import { useFunnel } from "@/contexts/FunnelContext";
import logo from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";
import resultadoCarol from "@/assets/resultado-carol.jpg";

const Quiz18 = () => {
  const navigate = useNavigate();
  const { data } = useFunnel();

  // Calculate IMC
  const weight = parseFloat(data.currentWeight) || 70;
  const heightCm = parseFloat(data.height) || 165;
  const heightM = heightCm / 100;
  const imc = weight / (heightM * heightM);
  const imcFormatted = imc.toFixed(2);

  // Determine IMC position (0-100%)
  const getImcPosition = () => {
    if (imc < 18.5) return (imc / 18.5) * 33;
    if (imc < 25) return 33 + ((imc - 18.5) / 6.5) * 34;
    return 67 + Math.min(((imc - 25) / 10) * 33, 33);
  };

  const imcPosition = getImcPosition();

  const handleContinue = () => {
    // Navigate to offer page
    console.log("Navigate to offer page");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Mounjaro de Pobre" className="h-16 w-auto" />
        </div>

        {/* Progress bar 90% */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div className="h-full rounded-full" style={{ width: '90%', backgroundColor: '#1B8B4B' }} />
        </div>

        {/* Header */}
        <div className="text-center mb-6 animate-fade-in-up">
          <h1 className="text-xl font-bold text-funnel-title">
            {data.name || "Usuário"}, veja como o{" "}
            <span className="text-[#1B8B4B]">Mounjaro de Pobre</span> está transformando vidas e veja os{" "}
            <span className="text-[#1B8B4B]">resultados da nossa comunidade!</span>
          </h1>
        </div>

        {/* IMC Section */}
        <div className="text-center mb-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <h2 className="text-lg font-bold text-funnel-title mb-4">
            Índice de Massa Corporal (IMC)
          </h2>

          {/* IMC Card - matching reference exactly */}
          <div 
            className="rounded-2xl p-4 relative"
            style={{
              background: 'linear-gradient(to right, #196737, #d71514)'
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-bold text-white">
                Seu IMC é: {imcFormatted}
              </p>
              <div className="text-right flex items-center gap-2">
                <span className="text-yellow-300 text-lg">⚠️</span>
                <span className="text-xs text-yellow-300 font-semibold">
                  Zona de Alerta
                </span>
              </div>
            </div>

            {/* Você está aqui badge */}
            <div className="flex justify-end mb-1">
              <span className="text-xs bg-white px-3 py-1 rounded text-gray-700 font-medium shadow-sm">
                Você está aqui
              </span>
            </div>

            {/* IMC Slider - white bar */}
            <div className="relative mb-3">
              <div className="h-2 bg-white/30 rounded-full" />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-2 border-gray-300 shadow-lg"
                style={{ left: `calc(${Math.min(imcPosition, 95)}% - 10px)` }}
              />
            </div>

            <div className="flex justify-between text-xs font-semibold mt-2">
              <span className="text-white">Abaixo do peso</span>
              <span className="text-white">Normal</span>
              <span className="text-white">Sobrepeso</span>
            </div>
          </div>
        </div>

        {/* Info Card - Light Blue Background */}
        <div className="bg-[#E3F2FD] rounded-2xl p-5 mb-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-[#2196F3] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <div>
              <h3 className="font-bold text-funnel-title mb-2 text-base">
                Seu metabolismo pode estar te sabotando sem que você perceba!
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Mesmo estando no peso normal, seu corpo pode estar retendo toxinas e trabalhando de forma mais lenta, dificultando a queima de gordura e deixando você com menos energia.
              </p>
            </div>
          </div>
        </div>

        {/* Alert Card - Light Yellow Background */}
        <div className="bg-[#FFF8E1] rounded-2xl p-5 mb-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[#FFA000] text-xl">🔔</span>
            </div>
            <div>
              <h3 className="font-bold text-funnel-title mb-3 text-base">
                Alguns sinais de alerta:
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex gap-2">
                  <span className="text-red-500">✖</span>
                  <span>Metabolismo lento e dificuldade para emagrecer mesmo comendo pouco.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✖</span>
                  <span>Cansaço constante e sensação de inchaço.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✖</span>
                  <span>Acúmulo de gordura em áreas específicas do corpo, principalmente na barriga.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Card - Light Green Background */}
        <div className="bg-[#E8F5E9] rounded-2xl p-5 mb-6 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-[#4CAF50] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm">✓</span>
            </div>
            <div>
              <h3 className="font-bold text-funnel-title mb-2 text-base">
                Com o Mounjaro de Pobre, seu corpo acelera a queima de gordura naturalmente!
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                A combinação ideal de ingredientes pode ativar seu metabolismo, reduzir a retenção de líquidos e aumentar sua disposição.
              </p>
              <p className="text-sm text-[#1B8B4B] font-semibold flex items-center gap-1">
                <span>📥</span> Descubra agora como o Mounjaro de Pobre pode transformar seu corpo!
              </p>
            </div>
          </div>
        </div>

        {/* Transformation Section */}
        <div className="text-center mb-4 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
          <h3 className="text-lg font-semibold text-funnel-title mb-4">
            Veja a transformação da Carol!
          </h3>
          <div className="rounded-2xl overflow-hidden">
            <img 
              src={resultadoCarol}
              alt="Transformação da Carol - Antes e Depois"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          className="w-full py-6 text-lg font-semibold bg-[#1B8B4B] hover:bg-[#167A40] rounded-xl shadow-[0_4px_0_0_#0F5C2E] active:shadow-[0_2px_0_0_#0F5C2E] active:translate-y-[2px] transition-all animate-fade-in-up"
          style={{ animationDelay: "600ms" }}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default Quiz18;
