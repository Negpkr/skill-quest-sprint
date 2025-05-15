
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Import the components from the correct paths
import NavbarBrand from "./navbar/NavbarBrand";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./navbar/NavbarMobile";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  return (
    <nav className="bg-background sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <NavbarBrand />
          
          {/* Desktop Navigation */}
          <NavbarDesktop />
          
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
      <NavbarMobile 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        handleSignOut={handleSignOut}
      />
    </nav>
  );
};

export default Navbar;
