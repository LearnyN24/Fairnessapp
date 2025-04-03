
import { ReactNode } from "react";
import { Activity, FileUp, Heart, BarChart3, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavLinkProps {
  to: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
}

const NavLink = ({ to, icon, label, active = false }: NavLinkProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Link to={to}>
      <Button 
        variant={active ? "secondary" : "ghost"} 
        className={`flex items-center gap-2 ${active ? "bg-secondary" : ""}`}
      >
        {icon}
        {!isMobile && <span>{label}</span>}
      </Button>
    </Link>
  );
};

interface HeaderProps {
  activePage?: string;
}

const Header = ({ activePage = "home" }: HeaderProps) => {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-teal-600" />
          <span className="text-xl font-semibold">EquaHealth</span>
        </div>

        <nav className="flex items-center space-x-1">
          <NavLink 
            to="/" 
            icon={<Activity className="h-5 w-5" />} 
            label="Home" 
            active={activePage === "home"} 
          />
          <NavLink 
            to="/datasets" 
            icon={<FileUp className="h-5 w-5" />} 
            label="Datasets" 
            active={activePage === "datasets"} 
          />
          <NavLink 
            to="/models" 
            icon={<BarChart3 className="h-5 w-5" />} 
            label="Models" 
            active={activePage === "models"} 
          />
          <NavLink 
            to="/settings" 
            icon={<Settings className="h-5 w-5" />} 
            label="Settings" 
            active={activePage === "settings"} 
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
