
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import NavbarBrand from "@/components/navbar/NavbarBrand";
import NavbarDesktop from "@/components/navbar/NavbarDesktop";
import NavbarMobile from "@/components/navbar/NavbarMobile";

const Navbar: React.FC = () => {
  const { user, isLoading } = useAuth();

  return (
    <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
      <div className="container flex h-16 items-center justify-between">
        <NavbarBrand />
        <NavbarDesktop user={user} isLoading={isLoading} />
        <NavbarMobile user={user} isLoading={isLoading} />
      </div>
    </header>
  );
};

export default Navbar;
