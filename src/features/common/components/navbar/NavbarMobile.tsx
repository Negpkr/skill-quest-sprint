
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Sparkles } from "lucide-react";
import UserMenu, { UserMenuProps } from "@/features/common/components/UserMenu";

export interface NavbarMobileProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSignOut: () => void;
  user: any;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ 
  isOpen, 
  setIsOpen, 
  handleSignOut,
  user
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-background border-t">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link
          to="/"
          className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        
        {/* Dashboard Link for mobile */}
        <Link
          to="/dashboard"
          className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
          onClick={() => setIsOpen(false)}
        >
          Dashboard
        </Link>
        
        <div className="relative">
          <div className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary">
            Learn <ChevronDown className="inline ml-1 h-4 w-4" />
          </div>
          <div className="pl-6 mt-1 space-y-1">
            <Link to="/learn/design" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary" onClick={() => setIsOpen(false)}>
              Design
            </Link>
            <Link to="/learn/tech" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary" onClick={() => setIsOpen(false)}>
              Tech
            </Link>
            <Link to="/learn/marketing" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary" onClick={() => setIsOpen(false)}>
              Marketing
            </Link>
            <Link to="/learn/creator" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary" onClick={() => setIsOpen(false)}>
              Creator
            </Link>
            <Link to="/learn/business" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary" onClick={() => setIsOpen(false)}>
              Business
            </Link>
            <Link to="/learn/freelance" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary" onClick={() => setIsOpen(false)}>
              Freelance
            </Link>
          </div>
        </div>
        
        <Link
          to="/sprints"
          className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
          onClick={() => setIsOpen(false)}
        >
          Sprints
        </Link>
        
        {/* Generate Sprint Link for mobile menu */}
        <Link
          to="/generate-sprint"
          className="block px-3 py-2 rounded-md text-base font-medium bg-skillpurple-50 text-skillpurple-500"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Generate Sprint
          </div>
        </Link>
        
        {/* Login/Logout for mobile */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <UserMenu user={user} handleSignOut={handleSignOut} />
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
