
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t mt-auto py-6">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Heart className="h-4 w-4 text-teal-500 mr-2" />
            <span className="text-sm text-muted-foreground">
              EquaHealth AI - Fair Healthcare Predictions
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
