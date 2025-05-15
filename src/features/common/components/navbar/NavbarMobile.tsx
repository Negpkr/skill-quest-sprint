
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import UserMenu from "@/features/auth/components/UserMenu";

interface NavbarMobileProps {
  user: any;
  handleSignOut: () => void;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ user, handleSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="sm" onClick={toggleMenu}>
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-50 p-4 flex flex-col space-y-3">
          <Link
            to="/challenges"
            className="text-gray-600 hover:text-gray-900 py-2"
            onClick={toggleMenu}
          >
            Challenges
          </Link>
          <Link
            to="/community"
            className="text-gray-600 hover:text-gray-900 py-2"
            onClick={toggleMenu}
          >
            Community
          </Link>
          <Link
            to="/blog"
            className="text-gray-600 hover:text-gray-900 py-2"
            onClick={toggleMenu}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-gray-900 py-2"
            onClick={toggleMenu}
          >
            About
          </Link>

          {user ? (
            <div className="py-2">
              <UserMenu user={user} handleSignOut={handleSignOut} />
            </div>
          ) : (
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login" onClick={toggleMenu}>
                <Button variant="outline" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link to="/signup" onClick={toggleMenu}>
                <Button className="w-full">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarMobile;
