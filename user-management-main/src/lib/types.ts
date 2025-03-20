
export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: string;
  updatedAt: string;
}

export type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UserUpdateInput = Partial<UserCreateInput>;

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export interface ApiError {
  status: number;
  message: string;
}
