import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import QuizLayout from "@/components/funnel/QuizLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFunnel } from "@/contexts/FunnelContext";

const Quiz4 = () => {
  const navigate = useNavigate();
  const { updateData } = useFunnel();
  const [name, setName] = useState("");

  const handleContinue = () => {
    if (name.trim()) {
      updateData("name", name.trim());
      navigate("/quiz5");
    }
  };

  return (
    <QuizLayout progress={70}>
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-xl md:text-2xl font-bold text-funnel-title">
          Qual seu nome?
        </h1>
      </div>

      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Digite seu nome aqui"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-12 py-6 text-base rounded-xl border-gray-200"
          />
        </div>

        <Button
          onClick={handleContinue}
          disabled={!name.trim()}
          className="w-full py-6 text-lg font-semibold bg-funnel-accent hover:bg-funnel-accent/90 rounded-xl"
        >
          Continuar
        </Button>
      </div>

      <p className="text-center text-sm text-funnel-subtitle mt-6 px-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        Para montar seu plano personalizado, precisamos do seu nome. Fique tranquila, seus dados estão protegidos🔒
      </p>
    </QuizLayout>
  );
};

export default Quiz4;
