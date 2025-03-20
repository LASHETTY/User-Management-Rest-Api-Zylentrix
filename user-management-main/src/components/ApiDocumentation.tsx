
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className="overflow-x-auto p-4 rounded-md bg-muted font-mono text-sm">
        <code>{code}</code>
      </pre>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8 p-0"
        onClick={copyToClipboard}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
};

const ApiDocumentation: React.FC = () => {
  const endpoints = [
    {
      id: 'get-all',
      title: 'Get All Users',
      description: 'Retrieves a list of all users.',
      method: 'GET',
      url: '/api/users',
      code: `// Using fetch
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Using axios
axios.get('/api/users')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));`,
      response: `{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 28,
      "createdAt": "2023-05-01T12:00:00.000Z",
      "updatedAt": "2023-05-01T12:00:00.000Z"
    },
    // more users...
  ],
  "message": "Users retrieved successfully"
}`
    },
    {
      id: 'get-one',
      title: 'Get User by ID',
      description: 'Retrieves a single user by their ID.',
      method: 'GET',
      url: '/api/users/:id',
      code: `// Using fetch
fetch('/api/users/1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Using axios
axios.get('/api/users/1')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));`,
      response: `{
  "success": true,
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 28,
    "createdAt": "2023-05-01T12:00:00.000Z",
    "updatedAt": "2023-05-01T12:00:00.000Z"
  },
  "message": "User retrieved successfully"
}`
    },
    {
      id: 'create',
      title: 'Create User',
      description: 'Creates a new user with the provided information.',
      method: 'POST',
      url: '/api/users',
      code: `// Using fetch
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Alice Johnson',
    email: 'alice@example.com',
    age: 30
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Using axios
axios.post('/api/users', {
  name: 'Alice Johnson',
  email: 'alice@example.com',
  age: 30
})
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));`,
      response: `{
  "success": true,
  "data": {
    "id": "4",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "age": 30,
    "createdAt": "2023-05-10T15:22:00.000Z",
    "updatedAt": "2023-05-10T15:22:00.000Z"
  },
  "message": "User created successfully"
}`
    },
    {
      id: 'update',
      title: 'Update User',
      description: 'Updates an existing user\'s information.',
      method: 'PUT',
      url: '/api/users/:id',
      code: `// Using fetch
fetch('/api/users/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Smith',
    age: 29
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Using axios
axios.put('/api/users/1', {
  name: 'John Smith',
  age: 29
})
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));`,
      response: `{
  "success": true,
  "data": {
    "id": "1",
    "name": "John Smith",
    "email": "john@example.com",
    "age": 29,
    "createdAt": "2023-05-01T12:00:00.000Z",
    "updatedAt": "2023-05-10T16:14:00.000Z"
  },
  "message": "User updated successfully"
}`
    },
    {
      id: 'delete',
      title: 'Delete User',
      description: 'Removes a user from the database.',
      method: 'DELETE',
      url: '/api/users/:id',
      code: `// Using fetch
fetch('/api/users/1', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Using axios
axios.delete('/api/users/1')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));`,
      response: `{
  "success": true,
  "message": "User deleted successfully"
}`
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 md:px-6"
      >
        <div className="mb-8 text-center">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
            API Documentation
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-3">
            REST API Endpoints
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            Explore our RESTful API endpoints for managing users with full CRUD operations.
          </p>
        </div>

        <Tabs defaultValue="get-all" className="w-full">
          <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="get-all">Get All</TabsTrigger>
            <TabsTrigger value="get-one">Get One</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="update">Update</TabsTrigger>
            <TabsTrigger value="delete">Delete</TabsTrigger>
          </TabsList>
          
          {endpoints.map((endpoint) => (
            <TabsContent key={endpoint.id} value={endpoint.id} className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{endpoint.title}</CardTitle>
                      <CardDescription>{endpoint.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                        endpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                        endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {endpoint.method}
                      </span>
                      <span className="text-sm font-mono bg-muted py-1 px-2 rounded">
                        {endpoint.url}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <Code className="mr-2 h-4 w-4" />
                      Request Example
                    </h4>
                    <CodeBlock code={endpoint.code} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Response Example</h4>
                    <CodeBlock code={endpoint.response} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 md:mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Want to try these endpoints directly?
          </p>
          <a 
            href="#users"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            Go to Interactive Demo
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default ApiDocumentation;
