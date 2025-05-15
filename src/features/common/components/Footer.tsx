
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t mt-auto">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/challenges" className="text-muted-foreground hover:text-foreground transition-colors">Challenges</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Learn</h3>
            <ul className="space-y-2">
              <li><Link to="/learn/design-basics" className="text-muted-foreground hover:text-foreground transition-colors">Design Basics</Link></li>
              <li><Link to="/learn/tech-starter" className="text-muted-foreground hover:text-foreground transition-colors">Tech Starter</Link></li>
              <li><Link to="/learn/freelancing101" className="text-muted-foreground hover:text-foreground transition-colors">Freelancing 101</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help-center" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/report-problem" className="text-muted-foreground hover:text-foreground transition-colors">Report a Problem</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Daily Sprint. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
