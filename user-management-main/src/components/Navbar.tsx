
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 glassmorphism"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Code className="h-6 w-6 text-primary mr-2" />
            <span className="font-semibold text-lg">REST API Demo</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#users" className="text-sm font-medium hover:text-primary transition-colors">
              Users
            </a>
            <a href="#api" className="text-sm font-medium hover:text-primary transition-colors">
              API Usage
            </a>
            <a href="#documentation" className="text-sm font-medium hover:text-primary transition-colors">
              Documentation
            </a>
            <Button variant="default" size="sm" className="ml-2">
              Try the API
            </Button>
          </nav>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-background/95 backdrop-blur-sm border-b"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a 
              href="#users" 
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Users
            </a>
            <a 
              href="#api" 
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              API Usage
            </a>
            <a 
              href="#documentation" 
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </a>
            <Button variant="default" size="sm" className="w-full">
              Try the API
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
