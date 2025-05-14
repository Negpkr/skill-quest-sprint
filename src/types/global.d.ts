interface Window {
  testSupabaseConnection: () => Promise<any>;
  checkSupabaseProject: () => Promise<any>;
  createSupabaseTables: () => Promise<any>;
  testContactSubmission: () => Promise<any>;
  testSprintCreation: () => Promise<any>;
  testProblemReportSubmission: () => Promise<any>;
  runAllTests: () => Promise<any>;
  testMarkComplete: (sprintId: string, userId: string, currentDay?: number) => Promise<any>;
  testCheckUserProgress: (userId: string) => Promise<any>;
  testCheckSprintDetails: (sprintId: string) => Promise<any>;
  directMarkComplete: (sprintId: string, userId: string) => Promise<any>;
}
