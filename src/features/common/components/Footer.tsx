
import React from "react";
import { Link } from "react-router-dom";
import { Youtube, Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-foreground text-sm">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Challenges */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Challenges</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/challenges" className="text-muted-foreground hover:text-foreground text-sm">
                  Explore Challenges
                </Link>
              </li>
              <li>
                <Link to="/start-sprint" className="text-muted-foreground hover:text-foreground text-sm">
                  Start Your Sprint
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-muted-foreground hover:text-foreground text-sm">
                  Report a Problem
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/design-basics" className="text-muted-foreground hover:text-foreground text-sm">
                  Design Basics
                </Link>
              </li>
              <li>
                <Link to="/freelancing-101" className="text-muted-foreground hover:text-foreground text-sm">
                  Freelancing 101
                </Link>
              </li>
              <li>
                <Link to="/tech-starter" className="text-muted-foreground hover:text-foreground text-sm">
                  Tech Starter
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect - Updated to only include YouTube and GitHub/GitLab */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Connect</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://youtube.com" 
                  className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2 group"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-5 w-5 text-red-500 group-hover:text-red-600 transition-colors" />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2 group"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 group-hover:text-foreground transition-colors" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            Made with 🚀 and ☕ by the SkillSprint Team.
          </p>
          <p className="text-muted-foreground text-sm mt-2 md:mt-0">
            © 2025 SkillSprint. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
