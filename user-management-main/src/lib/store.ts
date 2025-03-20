
import { User, UserCreateInput, UserUpdateInput } from './types';

// Initial sample data
const initialUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    age: 28,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 32,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    age: 45,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// In-memory store
let users: User[] = [...initialUsers];

// Helper function to generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// CRUD operations
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getAllUsers = (): User[] => {
  return [...users];
};

export const createUser = (userData: UserCreateInput): User => {
  // Validate input
  if (!userData.name || !userData.email || userData.age === undefined) {
    throw new Error('Name, email, and age are required fields');
  }
  
  if (userData.age < 0 || userData.age > 120) {
    throw new Error('Age must be between 0 and 120');
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    throw new Error('Invalid email format');
  }
  
  // Check for duplicate email
  if (users.some(user => user.email === userData.email)) {
    throw new Error('Email already exists');
  }

  const timestamp = new Date().toISOString();
  const newUser: User = {
    id: generateId(),
    ...userData,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  users.push(newUser);
  return newUser;
};

export const updateUser = (id: string, userData: UserUpdateInput): User => {
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    throw new Error(`User with ID ${id} not found`);
  }
  
  // Validate email if provided
  if (userData.email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      throw new Error('Invalid email format');
    }
    
    // Check for duplicate email but exclude current user
    if (users.some(user => user.email === userData.email && user.id !== id)) {
      throw new Error('Email already exists');
    }
  }
  
  // Validate age if provided
  if (userData.age !== undefined && (userData.age < 0 || userData.age > 120)) {
    throw new Error('Age must be between 0 and 120');
  }

  const updatedUser: User = {
    ...users[userIndex],
    ...userData,
    updatedAt: new Date().toISOString()
  };

  users[userIndex] = updatedUser;
  return updatedUser;
};

export const deleteUser = (id: string): boolean => {
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    throw new Error(`User with ID ${id} not found`);
  }

  users = users.filter(user => user.id !== id);
  return true;
};

// Reset database (for testing purposes)
export const resetDatabase = (): void => {
  users = [...initialUsers];
};
