
import { PropertyCalculator } from "@/components/PropertyCalculator";
import { RankingsSection } from "@/components/RankingsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <PropertyCalculator />
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <RankingsSection />
      </div>
    </div>
  );
};

export default Index;
