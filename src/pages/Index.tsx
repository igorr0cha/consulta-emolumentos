
import { PropertyCalculator } from "@/components/PropertyCalculator";
import { RankingsSection } from "@/components/RankingsSection";
import { useState } from "react";

const Index = () => {
  const [valorImovel, setValorImovel] = useState<number>(500000);

  return (
    <div className="w-full">
      <PropertyCalculator />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <RankingsSection valorImovel={valorImovel} />
      </div>
    </div>
  );
};

export default Index;
