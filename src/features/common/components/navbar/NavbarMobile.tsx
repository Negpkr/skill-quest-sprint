
import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarMobileProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSignOut: () => Promise<void>;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ isOpen, setIsOpen, handleSignOut }) => {
  const { user } = useAuth();

  return (
    <div
      className={cn(
        "md:hidden fixed inset-0 bg-background/95 backdrop-blur-sm z-50 transform transition-all duration-300 ease-in-out",
        isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}
    >
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsOpen(false)}
          className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-secondary focus:outline-none"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="flex flex-col items-center space-y-8 p-8">
        <Link
          to="/"
          className="text-lg font-medium hover:text-skillpurple-400 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        
        <Link
          to="/challenges"
          className="text-lg font-medium hover:text-skillpurple-400 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Challenges
        </Link>
        
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-lg font-medium hover:text-skillpurple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            
            <Link
              to="/start-sprint"
              className="text-lg font-medium hover:text-skillpurple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Start Sprint
            </Link>
            
            <button
              onClick={async () => {
                await handleSignOut();
                setIsOpen(false);
              }}
              className="text-lg font-medium hover:text-red-500 transition-colors"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-lg font-medium hover:text-skillpurple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Log In
            </Link>
            
            <Link
              to="/signup"
              className="px-4 py-2 bg-skillpurple-400 text-white rounded-md font-medium hover:bg-skillpurple-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarMobile;
