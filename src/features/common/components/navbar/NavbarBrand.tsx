
import React from "react";
import { Link } from "react-router-dom";

const NavbarBrand: React.FC = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex-shrink-0 flex items-center">
        <span className="font-bold text-xl text-skillpurple-400">SkillSprint</span>
      </Link>
    </div>
  );
};

export default NavbarBrand;
