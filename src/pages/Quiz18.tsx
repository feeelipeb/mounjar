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
    <div className="min-h-screen bg-[#7DD3E1] flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Mounjaro de Pobre" className="h-16 w-auto" />
        </div>

        {/* Progress bar complete */}
        <div className="w-full h-2 bg-[#1B8B4B] rounded-full mb-6" />

        {/* Header */}
        <div className="text-center mb-6 animate-fade-in-up">
          <h1 className="text-xl font-bold text-funnel-title">
            <span className="text-funnel-title">{data.name || "Usuário"}</span>, veja como o{" "}
            <span className="text-[#1B8B4B]">Mounjaro de Pobre</span> está transformando vidas e veja os{" "}
            <span className="text-[#1B8B4B]">resultados da nossa comunidade!</span>
          </h1>
        </div>

        {/* IMC Section */}
        <div className="text-center mb-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <h2 className="text-lg font-bold text-funnel-title mb-4">
            Índice de Massa Corporal (IMC)
          </h2>

          <div className="bg-gradient-to-r from-[#E8F5E9] to-[#FFEBEE] rounded-2xl p-4">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-semibold text-funnel-title">
                Seu IMC é: {imcFormatted}
              </p>
              <div className="text-right">
                <span className="text-xs text-yellow-600 flex items-center gap-1">
                  ⚠️ Zona de Alerta
                </span>
                <span className="text-xs bg-[#FFEBEE] px-2 py-1 rounded text-funnel-subtitle">
                  Você está aqui
                </span>
              </div>
            </div>

            {/* IMC Slider */}
            <div className="relative mt-4 mb-2">
              <div className="h-2 bg-gradient-to-r from-[#64B5F6] via-[#81C784] to-[#E57373] rounded-full" />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-400 shadow-md"
                style={{ left: `${Math.min(imcPosition, 95)}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-funnel-subtitle mt-1">
              <span className="text-[#64B5F6]">Abaixo do peso</span>
              <span className="text-[#81C784]">Normal</span>
              <span className="text-[#E57373]">Sobrepeso</span>
            </div>
          </div>
        </div>

        {/* Alert Card 1 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="flex gap-3">
            <span className="text-xl">ℹ️</span>
            <div>
              <h3 className="font-bold text-funnel-title mb-2">
                Seu metabolismo pode estar te sabotando sem que você perceba!
              </h3>
              <p className="text-sm text-funnel-subtitle leading-relaxed">
                Mesmo estando no peso normal, seu corpo pode estar retendo toxinas e trabalhando de forma mais lenta, dificultando a queima de gordura e deixando você com menos energia.
              </p>
            </div>
          </div>
        </div>

        {/* Alert Card 2 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <div className="flex gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <h3 className="font-bold text-funnel-title mb-2">
                Alguns sinais de alerta:
              </h3>
              <ul className="text-sm text-funnel-subtitle space-y-2">
                <li>❌ Metabolismo lento e dificuldade para emagrecer mesmo comendo pouco.</li>
                <li>❌ Cansaço constante e sensação de inchaço.</li>
                <li>❌ Acúmulo de gordura em áreas específicas do corpo, principalmente na barriga.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <div className="flex gap-3">
            <span className="text-xl">✅</span>
            <div>
              <h3 className="font-bold text-funnel-title mb-2">
                Com o Mounjaro de Pobre, seu corpo acelera a queima de gordura naturalmente!
              </h3>
              <p className="text-sm text-funnel-subtitle leading-relaxed mb-2">
                A combinação ideal de ingredientes pode ativar seu metabolismo, reduzir a retenção de líquidos e aumentar sua disposição.
              </p>
              <p className="text-sm text-[#1B8B4B] font-semibold">
                📥 Descubra agora como o Mounjaro de Pobre pode transformar seu corpo!
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
