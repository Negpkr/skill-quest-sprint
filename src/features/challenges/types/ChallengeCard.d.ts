
export interface ChallengeProps {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  imageUrl: string;
  resources: Array<{ title: string; url: string; }>;
}
