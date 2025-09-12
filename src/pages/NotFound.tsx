import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <AlertTriangle className="h-16 w-16 text-primary animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold gradient-text">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="pt-4">
          <Button 
            asChild
            size="lg"
            className="bg-primary hover:bg-primary-glow transition-all duration-300 hover:shadow-glow"
          >
            <a href="/">
              <Home className="mr-2 h-5 w-5" />
              Return to Home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
