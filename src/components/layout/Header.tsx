
import { ReactNode } from "react";
import { Activity, FileUp, Heart, BarChart3, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  
  const initials = user?.name
    ? user.name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
    : "U";

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
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL} alt={user.name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border shadow-md">
                <DropdownMenuItem className="font-medium">
                  <Link to="/profile" className="flex items-center">
                    {user.name}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/profile" className="flex items-center">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavLink 
              to="/signin" 
              icon={<User className="h-5 w-5" />} 
              label="Sign In" 
              active={activePage === "signin"} 
            />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
