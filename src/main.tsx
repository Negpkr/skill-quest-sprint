
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './animations.css'
import { testConnection, checkProject } from './utils/testSupabaseConnection'
import { createAllTables } from './utils/createSupabaseTables'

// Make test functions available in the browser console
window.testSupabaseConnection = testConnection;
window.checkSupabaseProject = checkProject;
window.createSupabaseTables = createAllTables;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
