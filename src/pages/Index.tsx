
import { PropertyCalculator } from "@/components/PropertyCalculator";
import { RankingsSection } from "@/components/RankingsSection";

const Index = () => {
  return (
    <div className="w-full">
      <PropertyCalculator />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <RankingsSection />
      </div>
    </div>
  );
};

export default Index;
