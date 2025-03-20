
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { AlertTriangle, Code, Database, FolderPlus, RefreshCw, Search, Server, User as UserIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';
import UserCard from '@/components/UserCard';
import UserForm from '@/components/UserForm';
import ApiDocumentation from '@/components/ApiDocumentation';
import Footer from '@/components/Footer';
import { User, UserCreateInput, UserUpdateInput } from '@/lib/types';
import * as api from '@/lib/api';

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = users.filter(
        user =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.id.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.getAllUsers();
      
      if (response.success && response.data) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      } else {
        setError(response.error || 'Failed to fetch users');
        toast.error(response.error || 'Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('An unexpected error occurred');
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (userData: UserCreateInput) => {
    try {
      const response = await api.createUser(userData);
      
      if (response.success && response.data) {
        setUsers(prevUsers => [...prevUsers, response.data!]);
        toast.success('User created successfully');
        setIsCreatingUser(false);
      } else {
        toast.error(response.error || 'Failed to create user');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      toast.error('An unexpected error occurred');
    }
  };

  const handleUpdateUser = async (userData: UserUpdateInput) => {
    if (!editingUser) return;
    
    try {
      const response = await api.updateUser(editingUser.id, userData);
      
      if (response.success && response.data) {
        setUsers(prevUsers =>
          prevUsers.map(user => (user.id === editingUser.id ? response.data! : user))
        );
        toast.success('User updated successfully');
        setEditingUser(null);
      } else {
        toast.error(response.error || 'Failed to update user');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      toast.error('An unexpected error occurred');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setDeletingUserId(userId);
    
    try {
      const response = await api.deleteUser(userId);
      
      if (response.success) {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        toast.success('User deleted successfully');
      } else {
        toast.error(response.error || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setDeletingUserId(null);
    }
  };

  const handleResetDatabase = async () => {
    setIsLoading(true);
    
    try {
      const response = await api.resetDatabase();
      
      if (response.success) {
        toast.success('Database reset successfully');
        fetchUsers();
      } else {
        toast.error(response.error || 'Failed to reset database');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error resetting database:', err);
      toast.error('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  // Hero section animation variants
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="container mx-auto px-4 md:px-6 text-center"
          >
            <motion.div variants={itemVariants} className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              Backend Developer Assignment
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 max-w-3xl mx-auto">
              Simple & Elegant REST API
            </motion.h1>
            
            <motion.p variants={itemVariants} className="max-w-[600px] mx-auto text-muted-foreground mb-8">
              A beautifully designed REST API with full CRUD operations for managing users. Explore the interactive demo below.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <a href="#users" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Try Demo
              </a>
              <a href="#documentation" className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                View Documentation
              </a>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8 mt-16">
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">REST API</h3>
                <p className="text-sm text-muted-foreground">Full CRUD operations</p>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">In-Memory Database</h3>
                <p className="text-sm text-muted-foreground">Fast & efficient storage</p>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">JSON Responses</h3>
                <p className="text-sm text-muted-foreground">Clean data format</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <Card className="bg-card/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Create, retrieve, update, and delete users with ease.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Create new users with validation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Retrieve individual or all users</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Update existing user information</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Delete users from the database</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Error Handling</CardTitle>
                  <CardDescription>Comprehensive error handling and validation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Input validation for all fields</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Detailed error messages</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Non-existent resource handling</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Duplicate detection for emails</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>API Integration</CardTitle>
                  <CardDescription>Easy integration with any frontend application.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>RESTful endpoint design</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>JSON response format</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Consistent response structure</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>Detailed documentation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="users" className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8 text-center"
            >
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
                Interactive Demo
              </div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-3">
                Try the User Management API
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                Test all the CRUD operations with this interactive demo. Create, view, update, and delete users.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sidebar for user creation and editing */}
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  {editingUser ? (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Edit User</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setEditingUser(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                      <UserForm 
                        onSubmit={handleUpdateUser}
                        initialData={editingUser}
                        onCancel={() => setEditingUser(null)}
                      />
                    </div>
                  ) : isCreatingUser ? (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Create New User</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setIsCreatingUser(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                      <UserForm 
                        onSubmit={handleCreateUser}
                        onCancel={() => setIsCreatingUser(false)}
                      />
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>User Operations</CardTitle>
                          <CardDescription>
                            Create new users or manage existing ones
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Button 
                            className="w-full"
                            onClick={() => setIsCreatingUser(true)}
                          >
                            <FolderPlus className="mr-2 h-4 w-4" />
                            Create New User
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={handleResetDatabase}
                            disabled={isLoading}
                          >
                            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                            Reset Database
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="mt-6">
                        <CardHeader>
                          <CardTitle>API Information</CardTitle>
                          <CardDescription>
                            About this demo application
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                          <p>
                            This interactive demo demonstrates a complete RESTful API with CRUD operations for user management.
                          </p>
                          <p>
                            The API uses an in-memory data store for simplicity, with proper validation and error handling.
                          </p>
                          <p>
                            All operations have simulated network delay to demonstrate real-world API behavior.
                          </p>
                          <div className="flex justify-center mt-4">
                            <a 
                              href="#documentation"
                              className="text-primary hover:underline flex items-center"
                            >
                              <Code className="mr-1 h-4 w-4" />
                              View API Documentation
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Main content area for users list */}
              <div className="lg:col-span-8">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle>Users</CardTitle>
                        <CardDescription>
                          Manage users in the database
                        </CardDescription>
                      </div>
                      <div className="flex items-center w-full md:w-auto">
                        <div className="relative w-full md:w-auto">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search users..."
                            className="pl-8 w-full md:w-[220px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <Tabs
                          value={activeTab}
                          onValueChange={setActiveTab}
                          className="ml-4 hidden md:block"
                        >
                          <TabsList className="h-9">
                            <TabsTrigger value="all" className="text-xs px-2">All</TabsTrigger>
                            <TabsTrigger value="recent" className="text-xs px-2">Recent</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, index) => (
                          <div 
                            key={index} 
                            className="h-40 rounded-md border border-border bg-muted/20 p-4 animate-pulse"
                          ></div>
                        ))}
                      </div>
                    ) : error ? (
                      <Alert variant="destructive">
                        <AlertDescription>
                          {error}
                        </AlertDescription>
                      </Alert>
                    ) : filteredUsers.length === 0 ? (
                      <div className="text-center py-12">
                        <UserIcon className="h-12 w-12 text-muted-foreground opacity-20 mx-auto mb-4" />
                        <h3 className="font-medium text-lg mb-2">No users found</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {searchQuery ? "No users match your search criteria." : "No users exist in the database."}
                        </p>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setSearchQuery('');
                            if (users.length === 0) {
                              setIsCreatingUser(true);
                            }
                          }}
                        >
                          {searchQuery ? "Clear Search" : "Create a User"}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <AnimatePresence>
                          {filteredUsers.map((user) => (
                            <UserCard
                              key={user.id}
                              user={user}
                              onEdit={setEditingUser}
                              onDelete={handleDeleteUser}
                              isDeleting={deletingUserId === user.id}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section id="documentation" className="py-16 bg-secondary/50">
          <ApiDocumentation />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
