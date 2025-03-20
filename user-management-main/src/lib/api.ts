
import { User, UserCreateInput, UserUpdateInput, ApiResponse } from './types';
import * as store from './store';

// Simulated API delay
const API_DELAY = 500; // ms

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Create a user
export const createUser = async (userData: UserCreateInput): Promise<ApiResponse<User>> => {
  try {
    await delay(API_DELAY);
    const newUser = store.createUser(userData);
    return {
      success: true,
      data: newUser,
      message: 'User created successfully'
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create user'
    };
  }
};

// Get all users
export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  try {
    await delay(API_DELAY);
    const users = store.getAllUsers();
    return {
      success: true,
      data: users,
      message: 'Users retrieved successfully'
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch users'
    };
  }
};

// Get a user by ID
export const getUserById = async (id: string): Promise<ApiResponse<User>> => {
  try {
    await delay(API_DELAY);
    const user = store.getUserById(id);
    
    if (!user) {
      return {
        success: false,
        error: `User with ID ${id} not found`
      };
    }
    
    return {
      success: true,
      data: user,
      message: 'User retrieved successfully'
    };
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : `Failed to fetch user with ID ${id}`
    };
  }
};

// Update a user
export const updateUser = async (id: string, userData: UserUpdateInput): Promise<ApiResponse<User>> => {
  try {
    await delay(API_DELAY);
    const updatedUser = store.updateUser(id, userData);
    return {
      success: true,
      data: updatedUser,
      message: 'User updated successfully'
    };
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : `Failed to update user with ID ${id}`
    };
  }
};

// Delete a user
export const deleteUser = async (id: string): Promise<ApiResponse<void>> => {
  try {
    await delay(API_DELAY);
    const result = store.deleteUser(id);
    
    if (!result) {
      return {
        success: false,
        error: `User with ID ${id} not found`
      };
    }
    
    return {
      success: true,
      message: 'User deleted successfully'
    };
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : `Failed to delete user with ID ${id}`
    };
  }
};

// Reset database
export const resetDatabase = async (): Promise<ApiResponse<void>> => {
  try {
    await delay(API_DELAY);
    store.resetDatabase();
    return {
      success: true,
      message: 'Database reset successfully'
    };
  } catch (error) {
    console.error('Error resetting database:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reset database'
    };
  }
};
