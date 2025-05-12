
import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import UserMenu from "./UserMenu";
import NavbarLearnDropdown from "./NavbarLearnDropdown";
import { cn } from "@/lib/utils";

const NavbarDesktop: React.FC = () => {
  return (
    <div className="hidden md:flex md:items-center md:space-x-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors"
            >
              Home
            </Link>
          </NavigationMenuItem>
          
          {/* Dashboard Link */}
          <NavigationMenuItem>
            <Link 
              to="/dashboard" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors"
            >
              Dashboard
            </Link>
          </NavigationMenuItem>
          
          {/* Learn Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavbarLearnDropdown />
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          {/* Challenges Link */}
          <NavigationMenuItem>
            <Link 
              to="/challenges" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors"
            >
              Challenges
            </Link>
          </NavigationMenuItem>

          {/* Generate Sprint Link */}
          <NavigationMenuItem>
            <Button 
              asChild 
              variant="outline" 
              className="gap-1 border-skillpurple-400 text-skillpurple-400 hover:bg-skillpurple-50 hover:text-skillpurple-500"
            >
              <Link to="/generate-sprint">
                <Sparkles className="h-4 w-4" />
                Generate Sprint
              </Link>
            </Button>
          </NavigationMenuItem>
          
          {/* User Menu */}
          <NavigationMenuItem>
            <UserMenu />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavbarDesktop;
