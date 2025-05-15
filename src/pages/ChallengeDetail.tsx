
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "@/components/ui/use-toast";
import { useChallenges } from "@/hooks/useChallenges";
import SprintHeader from "@/components/sprint-detail/SprintHeader";
import SprintOverview from "@/components/sprint-detail/SprintOverview";
import SprintResources from "@/components/sprint-detail/SprintResources";
import DaysPreview from "@/components/sprint-detail/DaysPreview";
import LoadingState from "@/components/sprint-detail/LoadingState";
import NotFoundState from "@/components/sprint-detail/NotFoundState";
import { parseResources } from "@/utils/sprintUtils";

const ChallengeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { filteredChallenges, isLoading } = useChallenges();
  
  const challenge = filteredChallenges.find(c => c.id === id);
  
  const handleStartSprint = () => {
    toast({
      title: "Sprint Started!",
      description: `You've started the ${challenge?.title} sprint.`,
    });
    
    navigate(`/challenge/${id}`);
  };
  
  // Example days for the sprint
  const sprintDays = Array.from({ length: 30 }, (_, i) => {
    const dayNumber = i + 1;
    return {
      day: dayNumber,
      title: `Day ${dayNumber}`,
      description: `${challenge?.title || 'Sprint'} - Day ${dayNumber} task`
    };
  });
  
  const difficultyClass = 
    challenge?.difficulty === "Beginner" 
      ? "bg-softgreen text-green-800" 
      : challenge?.difficulty === "Intermediate" 
        ? "bg-softyellow text-yellow-800"
        : "bg-softorange text-orange-800";
  
  const categoryColors: Record<string, string> = {
    Design: "bg-softpurple text-purple-800",
    Tech: "bg-softblue text-blue-800",
    Marketing: "bg-softpink text-pink-800",
    Creator: "bg-softorange text-orange-800",
    Business: "bg-softpeach text-orange-800",
    Freelance: "bg-softgreen text-green-800",
    Productivity: "bg-softblue text-blue-800",
    Custom: "bg-gray-200 text-gray-800"
  };
    
  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <LoadingState />
        </div>
      </Layout>
    );
  }
  
  if (!challenge) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <NotFoundState />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <SprintHeader 
        challenge={challenge} 
        categoryColors={categoryColors}
        difficultyClass={difficultyClass}
      />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <SprintOverview challenge={challenge} handleStartSprint={handleStartSprint} />
          <SprintResources 
            challenge={challenge} 
            handleStartSprint={handleStartSprint} 
          />
        </div>
        
        <DaysPreview sprintDays={sprintDays} handleStartSprint={handleStartSprint} />
      </div>
    </Layout>
  );
};

export default ChallengeDetail;
