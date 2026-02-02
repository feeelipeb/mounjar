import { useState, useRef } from "react";
import { useFunnel } from "@/contexts/FunnelContext";
import { Check, Star, Shield, ThumbsUp, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import logo from "@/assets/logo.webp";
import heroAntes from "@/assets/hero-antes.png";
import heroDepois from "@/assets/hero-depois.png";
import garantia30Dias from "@/assets/garantia-30-dias.png";
import provaAnteDepois from "@/assets/prova-antes-depois.png";
import carrosselProva1 from "@/assets/carrossel-prova1.png";
import carrosselProva2 from "@/assets/carrossel-prova2.png";
import prova3 from "@/assets/prova-3.jpg";
import prova4 from "@/assets/prova-4.jpg";
import prova5 from "@/assets/prova-5.jpg";
import planos from "@/assets/planos.jpg";
import planos3 from "@/assets/planos-3.jpg";
import planosNovo from "@/assets/planos-novo.jpg";
import selosGarantia from "@/assets/selos-garantia.png";
const Quiz20 = () => {
  const {
    data
  } = useFunnel();
  const name = data.name || "Você";
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [carrosselProva1, carrosselProva2, prova3, prova4, prova5];
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentSlide(prev => (prev + 1) % carouselImages.length);
      } else {
        setCurrentSlide(prev => (prev - 1 + carouselImages.length) % carouselImages.length);
      }
    }
  };
  const handleCTA = () => {
    window.open("https://pay.kiwify.com.br/seu-link", "_blank");
  };
  const reviews = [{
    name: "Juliana Medeiros",
    avatar: "J",
    text: "Já eliminei 8kg em menos de 30 dias, resultado que nunca consegui com dietas! 😍",
    rating: 5
  }, {
    name: "APROVADO",
    avatar: "A",
    text: "Super recomendo! Meu marido nem acredita na minha transformação 🔥",
    rating: 5
  }, {
    name: "RECOMENDADÍSSIMO",
    avatar: "R",
    text: "Já tinha desistido de emagrecer... Esse protocolo mudou minha vida! 😭❤️",
    rating: 5
  }, {
    name: "MARAVILHA",
    avatar: "M",
    text: "3 semanas e já estou usando roupas que não cabiam há anos!",
    rating: 5
  }];
  const benefits = [{
    icon: "📦",
    title: "Apresentações e Quantidades de Chás: Ensinamos 30 dia de uso",
    highlight: "1000+ pessoas"
  }, {
    icon: "💰",
    title: "Investimento com 7 dias: Acesse o passo a passo do método e comece a ver ganhos resultado até 1-2 dias de uso. Você vai gastar…",
    highlight: "R$ 5/dia no máx."
  }, {
    icon: "🔥",
    title: "Anti-Oferta (variação Prescrição): ou se revoltar e jogar na fria outras tantas e dar o emprego…",
    highlight: ""
  }, {
    icon: "⚠️",
    title: "Hipertiroidismo: Não dar calmante coloca para sua família para ter efeito (o que não poderia)...",
    highlight: ""
  }];
  return <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-center py-4">
        <img src={logo} alt="Mounjaro de Pobre" className="h-14 w-auto" />
      </div>

      {/* Progress Bar */}
      <div className="px-4 mb-6">
        <div className="w-full max-w-md mx-auto h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{
          width: "100%"
        }} />
        </div>
      </div>

      <div className="px-4 pb-12 max-w-md mx-auto">
        {/* Headline */}
        <h1 className="text-lg md:text-xl font-bold text-center text-funnel-title mb-6">
          {name}, você está pronta para transformar sua vida e seu corpo de vez?
        </h1>

        {/* Before/After Hero */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-100">
          {/* Headers */}
          <div className="grid grid-cols-2 gap-4 mb-2">
            <p className="text-center font-bold text-funnel-title">ANTES</p>
            <p className="text-center font-bold text-funnel-title">DEPOIS</p>
          </div>
          
          {/* Images with chevron */}
          <div className="relative grid grid-cols-2 gap-2 mb-4">
            <img src={heroAntes} alt="Antes" className="w-full rounded-lg" />
            {/* Vertical separator */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />
            <img src={heroDepois} alt="Depois" className="w-full rounded-lg" />
            {/* Chevron in center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1">
              <ChevronRight className="w-5 h-5 text-gray-300" strokeWidth={3} />
            </div>
          </div>

          {/* Text descriptions */}
          <div className="grid grid-cols-2 gap-4 mb-3">
            <p className="text-center text-sm text-funnel-title">
              <em className="font-semibold">Esta é você antes</em> do Mounjaro de Pobre
            </p>
            <p className="text-center text-sm text-funnel-title">
              E esta é <strong>você depois</strong> da nossa solução.
            </p>
          </div>

          {/* Progress bars */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/4 h-full bg-red-500 rounded-full" />
              </div>
              <div className="w-3 h-3 rounded-full border-2 border-red-500" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-full h-full bg-green-500 rounded-full" />
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>

          {/* Bottom descriptions */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-500">Seu metabolismo está lento, fazendo você se sentir cansada.</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#1B8B4B' }} />
              <p className="text-xs text-gray-500">Aqui, seu metabolismo estará funcionando de forma otimizada.</p>
            </div>
          </div>
        </div>

        {/* Como funciona o Plano - Card */}
        <div className="rounded-2xl p-5 mb-4 border-l-4" style={{
        borderLeftColor: '#1B8B4B',
        backgroundColor: '#f8faf9'
      }}>
          <h3 className="font-bold text-[#1a365d] flex items-center gap-2 mb-3 text-base">
            <div className="w-5 h-5 rounded-full border-2 border-[#1B8B4B] flex items-center justify-center">
              <Check className="w-3 h-3 text-[#1B8B4B]" />
            </div>
            Como funciona o Plano?
          </h3>
          <p className="text-sm mb-2" style={{
          color: '#1B8B4B'
        }}>
            <strong>Com base nas suas informações pessoais e objetivos, criamos um plano 100% personalizado para você usar o Mounjaro de Pobre.</strong>
          </p>
          <p className="text-sm text-gray-600">
            Nossa abordagem estratégica foi feita para que você consiga potencializar sua perda de peso em 4 semanas, respeitando seu estilo de vida, sua rotina e o que você gosta de comer.
          </p>
        </div>

        {/* Seu plano inclui - Card */}
        <div className="rounded-2xl p-5 mb-8 border-l-4" style={{
        borderLeftColor: '#1B8B4B',
        backgroundColor: '#f8faf9'
      }}>
          <h3 className="font-bold text-[#1a365d] flex items-center gap-2 mb-4 text-base">
            <Check className="w-5 h-5 text-gray-400" />
            Seu plano inclui:
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              <strong className="text-[#1a365d]">Como usar o Mounjaro do Jeito Certo:</strong> Baseado nas pesquisas mais recentes de universidades famosas como Havard, desenvolvemos o Protocolo Mounjaro de Pobre, a forma mais eficaz e segura de usar o Mounjaro de Pobre para perder peso sem que você perca músculos ou sinta muita fome.
            </p>
            <p>
              <strong className="text-[#1a365d]">Definição de metas diárias:</strong> para você se manter no caminho certo.
            </p>
            <p>
              <strong className="text-[#1a365d]">Planilha de acompanhamento:</strong> Saiba exatamente quanto você está evoluindo.
            </p>
          </div>
          <p className="text-sm font-bold mt-4" style={{ color: '#1B8B4B' }}>
            3 Bônus Exclusivos + um Mega PRESENTE SURPRESA
          </p>
        </div>

        {/* Benefits for You */}
        <p className="text-center text-lg font-bold mb-8">
          <span className="text-[#1a365d]">Ao Garantir Seu Mounjaro de Pobre Hoje,</span>{" "}
          <span style={{
          color: '#1B8B4B'
        }}>Você Recebe</span><br />
          <span style={{
          color: '#1B8B4B'
        }}>Todos os Bônus de Presente!</span>
        </p>

        {/* Benefits List */}
        <div className="mb-6">
          <img src={planos3} alt="Lista de benefícios" className="w-full" />
        </div>

        {/* CTA Button */}
        <button onClick={handleCTA} className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-200 active:translate-y-1" style={{
        background: "#1B8B4B",
        boxShadow: "0 4px 0 #0F5C2E"
      }}>
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
          <div 
            className="overflow-hidden rounded-2xl relative cursor-grab active:cursor-grabbing aspect-[3/4] bg-gray-100"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img src={carouselImages[currentSlide]} alt={`Prova social ${currentSlide + 1}`} className="w-full h-full object-contain transition-opacity duration-500" />
            {/* Swipe indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" />
              <span>Deslize</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
          {/* Navigation Arrows */}
          <button 
            onClick={() => setCurrentSlide(prev => (prev - 1 + carouselImages.length) % carouselImages.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            onClick={() => setCurrentSlide(prev => (prev + 1) % carouselImages.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-3">
            {carouselImages.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-primary w-4" : "bg-gray-300"}`} />)}
          </div>
        </div>

        {/* Before/After Transformation */}
        <div className="mb-6">
          <img src={provaAnteDepois} alt="Transformação antes e depois" className="w-full rounded-2xl" />
        </div>

        {/* Plans Image */}
        <div className="mb-6">
          <img src={planosNovo} alt="Planos disponíveis" className="w-full rounded-2xl" />
        </div>

        {/* Pricing Card */}
        <div className="mb-6 rounded-xl border-2 bg-white py-3 px-4 flex items-center justify-between" style={{ borderColor: '#1B8B4B' }}>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#1B8B4B' }}>
              <Check className="w-4 h-4" style={{ color: '#1B8B4B' }} />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Mounjaro de Pobre</p>
              <p className="text-xs text-gray-500">Pagamento Único</p>
            </div>
          </div>
          <div className="rounded-lg px-3 py-2 text-center" style={{ backgroundColor: '#e8f5ec' }}>
            <p className="text-xs text-gray-600">70% off</p>
            <p className="font-bold text-lg" style={{ color: '#1B8B4B' }}>R$ 37,90</p>
          </div>
        </div>

        {/* CTA Button 2 */}
        <button onClick={handleCTA} className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-200 active:translate-y-1 mb-4" style={{
        background: "#1B8B4B",
        boxShadow: "0 4px 0 #0F5C2E"
      }}>
          Quero Começar Hoje! 🔥
        </button>

        {/* Security Badges 2 */}
        <div className="mb-8">
          <img src={selosGarantia} alt="Selos de garantia" className="w-full max-w-xs mx-auto" />
        </div>

        {/* Guarantee Section */}
        <div className="text-center mb-4">
          <p className="font-semibold text-funnel-title mb-4">Garantia de reembolso</p>
          <img src={garantia30Dias} alt="Garantia de 30 dias" className="w-40 mx-auto mb-4" />
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
          {reviews.map((review, index) => <div key={index} className="bg-white rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-funnel-title">{review.name}</p>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{review.text}</p>
            </div>)}
        </div>

        {/* Final CTA */}
        <button onClick={handleCTA} className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-200 active:translate-y-1" style={{
        background: "#1B8B4B",
        boxShadow: "0 4px 0 #0F5C2E"
      }}>
          Quero Começar Hoje! 🔥
        </button>
      </div>
    </div>;
};
export default Quiz20;