interface Window {
  testSupabaseConnection: () => Promise<any>;
  checkSupabaseProject: () => Promise<any>;
  createSupabaseTables: () => Promise<any>;
}
