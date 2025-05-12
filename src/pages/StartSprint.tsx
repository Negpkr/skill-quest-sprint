
import React from "react";
import Layout from "../components/Layout";
import SprintHeader from "@/components/start-sprint/SprintHeader";
import CustomSprintCard from "@/components/start-sprint/CustomSprintCard";
import SprintOptionsContainer from "@/components/start-sprint/SprintOptionsContainer";
import { useSprintOptions } from "@/hooks/useSprintOptions";

const StartSprint: React.FC = () => {
  const {
    sprints,
    isLoading,
    selectedSprint,
    setSelectedSprint,
    handleStartSprint
  } = useSprintOptions();
  
  return (
    <Layout>
      <SprintHeader />
      
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <CustomSprintCard />
        
        <h2 className="text-xl font-bold mb-6">Or Choose a Pre-made Sprint</h2>
        
        <SprintOptionsContainer 
          sprints={sprints}
          isLoading={isLoading}
          selectedSprint={selectedSprint}
          onSelectSprint={setSelectedSprint}
          onStartSprint={handleStartSprint}
        />
      </div>
    </Layout>
  );
};

export default StartSprint;
