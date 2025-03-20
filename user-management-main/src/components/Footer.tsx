
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="border-t py-8 mt-12"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Code className="h-5 w-5 text-primary mr-2" />
            <span className="font-semibold">REST API Demo</span>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center">
              Built with <Heart className="h-3 w-3 text-destructive mx-1" /> for the Backend Developer Assignment
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} User Management API. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
