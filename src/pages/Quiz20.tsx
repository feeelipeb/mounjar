import { useState, useEffect } from "react";
import { useFunnel } from "@/contexts/FunnelContext";
import { Check, Star, Shield, ThumbsUp, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import logo from "@/assets/logo.webp";
import heroAntes from "@/assets/hero-antes.png";
import heroDepois from "@/assets/hero-depois.png";
import garantia30Dias from "@/assets/garantia-30-dias.png";
import provaAnteDepois from "@/assets/prova-antes-depois.png";
import carrosselProva1 from "@/assets/carrossel-prova1.png";
import carrosselProva2 from "@/assets/carrossel-prova2.png";
import planos from "@/assets/planos.jpg";
import selosGarantia from "@/assets/selos-garantia.png";

const Quiz20 = () => {
  const { data } = useFunnel();
  const name = data.name || "Você";
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [carrosselProva1, carrosselProva2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCTA = () => {
    window.open("https://pay.kiwify.com.br/seu-link", "_blank");
  };

  const reviews = [
    { name: "Juliana Medeiros", avatar: "J", text: "Já eliminei 8kg em menos de 30 dias, resultado que nunca consegui com dietas! 😍", rating: 5 },
    { name: "APROVADO", avatar: "A", text: "Super recomendo! Meu marido nem acredita na minha transformação 🔥", rating: 5 },
    { name: "RECOMENDADÍSSIMO", avatar: "R", text: "Já tinha desistido de emagrecer... Esse protocolo mudou minha vida! 😭❤️", rating: 5 },
    { name: "MARAVILHA", avatar: "M", text: "3 semanas e já estou usando roupas que não cabiam há anos!", rating: 5 },
  ];

  const benefits = [
    { icon: "📦", title: "Apresentações e Quantidades de Chás: Ensinamos 30 dia de uso", highlight: "1000+ pessoas" },
    { icon: "💰", title: "Investimento com 7 dias: Acesse o passo a passo do método e comece a ver ganhos resultado até 1-2 dias de uso. Você vai gastar…", highlight: "R$ 5/dia no máx." },
    { icon: "🔥", title: "Anti-Oferta (variação Prescrição): ou se revoltar e jogar na fria outras tantas e dar o emprego…", highlight: "" },
    { icon: "⚠️", title: "Hipertiroidismo: Não dar calmante coloca para sua família para ter efeito (o que não poderia)...", highlight: "" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex justify-center py-4">
        <img src={logo} alt="Mounjaro de Pobre" className="h-14 w-auto" />
      </div>

      {/* Progress Bar */}
      <div className="px-4 mb-6">
        <div className="w-full max-w-md mx-auto h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: "100%" }} />
        </div>
      </div>

      <div className="px-4 pb-12 max-w-md mx-auto">
        {/* Headline */}
        <h1 className="text-lg md:text-xl font-bold text-center text-funnel-title mb-6">
          {name}, você está pronta para transformar sua vida e seu corpo de vez?
        </h1>

        {/* Before/After Hero */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-center">
            <span className="text-xs font-semibold text-gray-500 mb-1 block">ANTES</span>
            <img src={heroAntes} alt="Antes" className="w-full rounded-lg" />
            <div className="mt-2 flex items-center gap-1 justify-center">
              <span className="text-red-500 text-xs">❌</span>
              <span className="text-xs text-gray-600">Você está aqui nesse momento</span>
            </div>
          </div>
          <div className="text-center">
            <span className="text-xs font-semibold text-gray-500 mb-1 block">DEPOIS</span>
            <img src={heroDepois} alt="Depois" className="w-full rounded-lg" />
            <div className="mt-2 flex items-center gap-1 justify-center">
              <span className="text-green-500 text-xs">✅</span>
              <span className="text-xs text-gray-600">Você pode estar assim em dias</span>
            </div>
          </div>
        </div>

        {/* What you'll receive - Green Card */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4">
          <h3 className="font-bold text-funnel-title flex items-center gap-2 mb-3">
            <span className="text-primary">📦</span> O que você irá receber?
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            Você terá acesso ao <strong>Protocolo Completo do Mounjaro de Pobre</strong>, que é um passo a passo feito para você ter resultados em até 72h, simples de usar e funciona para qualquer mulher, em qualquer idade.
          </p>
          <p className="text-sm text-gray-700">
            O protocolo "Mounjaro de Pobre" é composto por <strong>4 Chás Naturais</strong> que aceleram seu metabolismo e queimam gordura localizada de forma natural e saudável.
          </p>
        </div>

        {/* Personalized Protocol Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-sm">
          <h3 className="font-bold text-funnel-title flex items-center gap-2 mb-3">
            <Check className="text-primary w-5 h-5" /> Seu protocolo personalizado
          </h3>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Criamos um Plano Personalizado de Emagrecimento</strong> para o seu metabolismo de acordo com as suas respostas.
          </p>
          <p className="text-sm text-gray-700 mb-3">
            Assim que se tornar aluna das outras alunas você terá acesso a esse material exclusivo no portal da aluna.
          </p>
          <p className="text-sm font-semibold text-primary">
            📲 Você receberá tudo pelo WhatsApp em até 2 min após o pagamento!
          </p>
        </div>

        {/* Benefits for You */}
        <p className="text-center text-sm text-muted-foreground underline mb-4">
          Ao Garantir Seu Mounjaro de Pobre hoje, <span className="text-primary font-semibold">Você Receberá</span><br />
          Todos os Métodos de Presente!!!
        </p>

        {/* Benefits List */}
        <div className="space-y-3 mb-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
              <span className="text-2xl">{benefit.icon}</span>
              <div>
                <p className="text-sm text-gray-700">{benefit.title}</p>
                {benefit.highlight && (
                  <span className="text-xs font-semibold text-primary">{benefit.highlight}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleCTA}
          className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-200 active:translate-y-1"
          style={{
            background: "#1B8B4B",
            boxShadow: "0 4px 0 #0F5C2E",
          }}
        >
          Quero Começar Hoje! 🔥
        </button>

        {/* Security Badges */}
        <div className="mt-4 mb-8">
          <img src={selosGarantia} alt="Selos de garantia" className="w-full max-w-xs mx-auto" />
        </div>

        {/* Social Proof Section */}
        <div className="text-center mb-4">
          <p className="font-semibold text-funnel-title">
            Clientes que <span className="text-primary">Tiveram Sucesso</span> 💚
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-6">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={carouselImages[currentSlide]}
              alt={`Prova social ${currentSlide + 1}`}
              className="w-full transition-opacity duration-500"
            />
          </div>
          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-3">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "bg-primary w-4" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Before/After Transformation */}
        <div className="mb-6">
          <img
            src={provaAnteDepois}
            alt="Transformação antes e depois"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        {/* Plans Image */}
        <div className="mb-6">
          <img
            src={planos}
            alt="Planos disponíveis"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        {/* CTA Button 2 */}
        <button
          onClick={handleCTA}
          className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-200 active:translate-y-1 mb-4"
          style={{
            background: "#1B8B4B",
            boxShadow: "0 4px 0 #0F5C2E",
          }}
        >
          Quero Começar Hoje! 🔥
        </button>

        {/* Security Badges 2 */}
        <div className="mb-8">
          <img src={selosGarantia} alt="Selos de garantia" className="w-full max-w-xs mx-auto" />
        </div>

        {/* Guarantee Section */}
        <div className="text-center mb-4">
          <p className="font-semibold text-funnel-title mb-4">Garantia de reembolso</p>
          <img
            src={garantia30Dias}
            alt="Garantia de 30 dias"
            className="w-40 mx-auto mb-4"
          />
          <p className="text-sm text-gray-600 mb-4">
            <strong>A DECISÃO MAIS FÁCIL E SEM RISCO DA SUA VIDA</strong>
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Nós confiamos tanto no poder do método que oferecemos garantia de 30 dias:
            Você e a única pessoa que tem a ver tudo, colocar em prática, e se não gostar por
            algum motivo, é só me chamar no suporte e eu devolvo cada centavo que você
            pagou. Você tem 30 dias de Garantia.
          </p>
          <p className="text-xs text-primary font-semibold mb-6">
            📲 Em caso de qualquer dúvida entre em contato pelo e-mail que retornaremos.
          </p>
        </div>

        {/* Reviews Section */}
        <div className="space-y-3 mb-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-funnel-title">{review.name}</p>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{review.text}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <button
          onClick={handleCTA}
          className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-200 active:translate-y-1"
          style={{
            background: "#1B8B4B",
            boxShadow: "0 4px 0 #0F5C2E",
          }}
        >
          Quero Começar Hoje! 🔥
        </button>
      </div>
    </div>
  );
};

export default Quiz20;
