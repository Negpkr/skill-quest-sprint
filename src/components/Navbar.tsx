
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ChevronDown, User, Sparkles } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getUserInitials = () => {
    if (!user) return "U";
    const name = user.user_metadata?.full_name || user.email || "";
    if (!name) return "U";
    
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors">
                    Home
                  </Link>
                </NavigationMenuItem>
                
                {/* Learn Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid grid-cols-2 gap-3 p-4 md:w-[500px]">
                      <ListItem title="Design" href="/learn/design">
                        Learn essential design skills and build a portfolio
                      </ListItem>
                      <ListItem title="Tech" href="/learn/tech">
                        Build coding skills and develop web applications
                      </ListItem>
                      <ListItem title="Marketing" href="/learn/marketing">
                        Master digital marketing strategies
                      </ListItem>
                      <ListItem title="Creator" href="/learn/creator">
                        Create content for social media and beyond
                      </ListItem>
                      <ListItem title="Business" href="/learn/business">
                        Start and grow your business venture
                      </ListItem>
                      <ListItem title="Freelance" href="/learn/freelance">
                        Build a successful freelance career
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                {/* Challenges Link */}
                <NavigationMenuItem>
                  <Link to="/challenges" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors">
                    Challenges
                  </Link>
                </NavigationMenuItem>

                {/* Generate Sprint Link - Added here */}
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
                
                {/* About Link */}
                <NavigationMenuItem>
                  <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors">
                    About
                  </Link>
                </NavigationMenuItem>
                
                {/* Login/User Button */}
                <NavigationMenuItem>
                  {!user ? (
                    <div className="flex items-center gap-2">
                      <Button asChild variant="ghost">
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button asChild className="bg-skillpurple-400 hover:bg-skillpurple-500 text-white">
                        <Link to="/signup">Sign Up</Link>
                      </Button>
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-skillpurple-100 text-skillpurple-500">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/dashboard">Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/practice">Practice</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/settings">Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
              to="/challenges"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              Challenges
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
            
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            
            {/* Login/Logout for mobile */}
            {!user ? (
              <>
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
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/practice"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Practice
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-gray-100 hover:bg-gray-200"
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
