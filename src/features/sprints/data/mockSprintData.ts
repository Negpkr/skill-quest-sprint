
// Fallback mock data for challenges when database data is unavailable
export const mockChallengeData: Record<string, any> = {
  'design-starter': {
    title: 'Design Sprint Starter',
    description: 'Learn design fundamentals and create your first professional designs.',
    category: 'Design',
    difficulty: 'Beginner',
    tasks: Array.from({ length: 30 }, (_, i) => ({
      id: `design-task-${i+1}`,
      title: `Day ${i+1}: Design Fundamentals`,
      day: i+1
    }))
  },
  'web-dev': {
    title: 'Web Development Foundations',
    description: 'Build your first website with HTML, CSS, and JavaScript.',
    category: 'Tech',
    difficulty: 'Beginner',
    tasks: Array.from({ length: 30 }, (_, i) => ({
      id: `webdev-task-${i+1}`,
      title: `Day ${i+1}: Web Development Basics`,
      day: i+1
    }))
  },
  'freelance-launchpad': {
    title: 'Freelance Launchpad',
    description: 'Start your freelance career and land your first client.',
    category: 'Freelance',
    difficulty: 'Beginner',
    tasks: Array.from({ length: 30 }, (_, i) => ({
      id: `freelance-task-${i+1}`,
      title: `Day ${i+1}: Freelance Fundamentals`,
      day: i+1
    }))
  }
};
