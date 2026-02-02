import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.webp";
import provasocial1 from "@/assets/provasocial-1.jpg";
import provasocial2 from "@/assets/provasocial-2.jpg";
import provasocial3 from "@/assets/provasocial-3.jpg";
import provasocial4 from "@/assets/provasocial-4.jpg";
import useEmblaCarousel from "embla-carousel-react";

const carouselImages = [provasocial1, provasocial2, provasocial3, provasocial4];

const Quiz17 = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Progress bar animation - 7 seconds
  useEffect(() => {
    const duration = 7000;
    const interval = 50;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Navigate when loading complete
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        navigate("/quiz18");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, navigate]);

  // Carousel auto-slide - 1.8 seconds
  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      scrollNext();
    }, 1800);

    return () => clearInterval(autoSlide);
  }, [scrollNext]);

  // Track current slide for dots
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Mounjaro de Pobre" className="h-16 w-auto" />
        </div>

        {/* Header Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: '#1B8B4B' }} />
        </div>

        {/* Title */}
        <div className="text-center mb-6 animate-fade-in-up">
          <h1 className="text-xl font-bold text-funnel-title">
            <span className="text-funnel-accent">Aguarde</span> enquanto preparamos o
            <br />
            Mounjaro de Pobre......
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-2">
          <div className="w-full h-7 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-100 ease-linear rounded-full flex items-center justify-center"
              style={{ 
                width: `${progress}%`,
                backgroundColor: '#1B8B4B'
              }}
            >
              <span className="text-white font-bold text-sm">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <p className="text-center text-funnel-title font-semibold mb-8">
          Carregando...
        </p>

        {/* Carousel */}
        <div className="w-full overflow-hidden rounded-lg" ref={emblaRef}>
          <div className="flex">
            {carouselImages.map((img, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                <img
                  src={img}
                  alt={`Resultado ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className="w-2 h-2 rounded-full transition-colors"
              style={{ 
                backgroundColor: currentSlide === index ? '#1B8B4B' : '#D1D5DB' 
              }}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz17;
