
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-background sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-skillpurple-400">SkillSprint</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors">
              Home
            </Link>
            <Link to="/challenges" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors">
              Challenges
            </Link>
            <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors">
              Dashboard
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors">
              About
            </Link>
            <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors">
              Login
            </Link>
            <Button asChild className="bg-skillpurple-400 hover:bg-skillpurple-500 text-white">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-secondary focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/challenges"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              Challenges
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2 rounded-md text-base font-medium bg-skillpurple-400 text-white"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
