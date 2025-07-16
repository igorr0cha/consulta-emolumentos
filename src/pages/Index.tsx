
import { PropertyCalculator } from "@/components/PropertyCalculator";
import { RankingsSection } from "@/components/RankingsSection";
import { useState } from "react";

const Index = () => {
  const [valorImovel, setValorImovel] = useState<number>(0);
  const [showRankings, setShowRankings] = useState<boolean>(false);

  const handleValorImovelChange = (valor: number) => {
    setValorImovel(valor);
    if (valor > 0) {
      setShowRankings(true);
    }
  };

  return (
    <div className="w-full">
      <PropertyCalculator onValorImovelChange={handleValorImovelChange} />
      {showRankings && valorImovel > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <RankingsSection valorImovel={valorImovel} />
        </div>
      )}
    </div>
  );
};

export default Index;
