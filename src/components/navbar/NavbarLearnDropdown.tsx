
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Reuse the ListItem component from the original Navbar
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <Link
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
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";

const NavbarLearnDropdown: React.FC = () => {
  return (
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
  );
};

export default NavbarLearnDropdown;
