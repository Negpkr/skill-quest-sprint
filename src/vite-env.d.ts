/// <reference types="vite/client" />

interface Window {
  testSupabaseConnection: () => Promise<any>;
  checkSupabaseProject: () => Promise<any>;
  createSupabaseTables: () => Promise<any>;
  testContactSubmission: (name: string, email: string, subject: string, message: string) => Promise<any>;
  testSprintCreation: () => Promise<any>;
  testProblemReportSubmission: (issueType: string, description: string, email?: string) => Promise<any>;
  runAllTests: () => Promise<any>;
  testMarkComplete: (userId: string, sprintId: string, currentDay: number) => Promise<any>;
  testCheckUserProgress: (userId: string, sprintId: string) => Promise<any>;
  testCheckSprintDetails: (sprintId: string) => Promise<any>;
  directMarkComplete: (userId: string, sprintId: string) => Promise<any>;
  fixDatabaseStructure: () => Promise<any>;
  fixAllIssues: () => Promise<any>;
  testCompletedField: () => Promise<any>;
  fixUserStreak: (userId: string) => Promise<any>;
  fixAllStreaks: () => Promise<any>;
}
