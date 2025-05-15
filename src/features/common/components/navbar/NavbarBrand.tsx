
import React from "react";
import { Link } from "react-router-dom";

const NavbarBrand: React.FC = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-xl font-bold">Skillboost</span>
      </Link>
    </div>
  );
};

export default NavbarBrand;
