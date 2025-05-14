
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './animations.css'
import fixUserStreakUtil from './utils/fixUserStreakUtil'
import { fixStreakIssues } from './utils/fixStreakIssues'

// Make test functions available in the browser console
window.fixUserStreak = fixUserStreakUtil;
window.fixAllStreaks = fixStreakIssues;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
