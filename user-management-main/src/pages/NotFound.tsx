
import React from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        
        <h1 className="text-4xl font-bold mb-3">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="bg-muted/50 p-4 rounded-md mb-8 text-sm text-left">
          <p className="font-mono">
            Attempted path: <span className="text-destructive">{location.pathname}</span>
          </p>
        </div>
        
        <Link to="/">
          <Button>
            Return Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
