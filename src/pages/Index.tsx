import { useNavigate } from "react-router-dom";
import FunnelHeader from "@/components/funnel/FunnelHeader";
import AgeCard from "@/components/funnel/AgeCard";
import { useFunnel } from "@/contexts/FunnelContext";

import woman1827 from "@/assets/woman-18-27.png";
import woman2839 from "@/assets/woman-28-39.png";
import woman4054 from "@/assets/woman-40-54.png";
import woman54plus from "@/assets/woman-54-plus.png";

const ageOptions = [
  { id: "18-27", label: "18-27", image: woman1827 },
  { id: "28-39", label: "28-39", image: woman2839 },
  { id: "40-54", label: "40-54", image: woman4054 },
  { id: "54+", label: "54+", image: woman54plus },
];

const Index = () => {
  const navigate = useNavigate();
  const { updateData } = useFunnel();

  const handleAgeSelect = (ageId: string) => {
    updateData("age", ageId);
    navigate("/quiz1");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        <FunnelHeader 
          title="Antes de começar..." 
          subtitle="Qual é a sua idade?" 
        />
        
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {ageOptions.map((option, index) => (
            <AgeCard
              key={option.id}
              image={option.image}
              label={option.label}
              onClick={() => handleAgeSelect(option.id)}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
