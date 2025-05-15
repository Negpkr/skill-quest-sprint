
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UserMenu from "@/features/auth/components/UserMenu";

interface NavbarDesktopProps {
  user: any;
  handleSignOut: () => void;
}

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ user, handleSignOut }) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link to="/challenges" className="text-gray-600 hover:text-gray-900">
        Challenges
      </Link>
      <Link to="/community" className="text-gray-600 hover:text-gray-900">
        Community
      </Link>
      <Link to="/blog" className="text-gray-600 hover:text-gray-900">
        Blog
      </Link>
      <Link to="/about" className="text-gray-600 hover:text-gray-900">
        About
      </Link>
      {user ? (
        <UserMenu user={user} handleSignOut={handleSignOut} />
      ) : (
        <div className="flex items-center space-x-2">
          <Link to="/login">
            <Button variant="outline">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign up</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavbarDesktop;
