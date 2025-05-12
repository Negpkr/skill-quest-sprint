
import { mockChallengeData } from "@/data/mockSprintData";
import { Challenge, Sprint } from "@/types/sprint";

export const useFallbackData = (
  id: string | undefined, 
  setSprint: (sprint: Sprint) => void, 
  setChallenges: (challenges: Challenge[]) => void,
  setNotFound: (notFound: boolean) => void
) => {
  const useFallbackSprint = () => {
    console.log("Using fallback data for:", id);
    
    if (id && mockChallengeData[id]) {
      const mockData = mockChallengeData[id];
      
      setSprint({
        id: id,
        title: mockData.title,
        description: mockData.description,
        category: mockData.category,
        difficulty: mockData.difficulty,
        duration: 30 // Default
      });
      
      // Create mock challenges from the tasks in the mock data
      const mockChallenges = mockData.tasks.map((task: any) => ({
        id: task.id,
        title: task.title,
        description: "Complete this task to continue your progress in this challenge.",
        day: task.day,
        resources: JSON.stringify([
          { title: "Getting Started", url: "https://example.com/resources" }
        ])
      }));
      
      setChallenges(mockChallenges);
      return true;
    }
    
    // If no relevant mock data is found
    setNotFound(true);
    return false;
  };

  return useFallbackSprint;
};
