
export interface Challenge {
  id: string;
  title: string;
  description: string;
  day: number;
  resources: string | null;
}

export interface Sprint {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
}

export interface UseChallengeReturn {
  sprint: Sprint | null;
  challenges: Challenge[];
  currentDay: number;
  isLoading: boolean;
  taskCompleted: boolean;
  notFound: boolean;
  handleMarkComplete: () => Promise<void>;
  getCurrentChallenge: () => Challenge | undefined;
  parseResources: (resourcesStr: string | null) => any[];
}
