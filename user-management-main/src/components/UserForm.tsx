
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCreateInput, UserUpdateInput, User } from '@/lib/types';
import { toast } from 'sonner';

interface UserFormProps {
  onSubmit: (userData: UserCreateInput | UserUpdateInput) => Promise<void>;
  initialData?: User;
  isLoading?: boolean;
  onCancel?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
  onCancel
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [age, setAge] = useState(initialData?.age?.toString() || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(parseInt(age)) || parseInt(age) < 0 || parseInt(age) > 120) {
      newErrors.age = 'Age must be a number between 0 and 120';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }
    
    try {
      await onSubmit({
        name,
        email,
        age: parseInt(age)
      });
      
      if (!initialData) {
        // If creating a new user, reset the form
        setName('');
        setEmail('');
        setAge('');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-card rounded-lg shadow-sm border"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter name"
          disabled={isLoading}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-xs text-destructive mt-1">{errors.name}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter email"
          disabled={isLoading}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-xs text-destructive mt-1">{errors.email}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          placeholder="Enter age"
          min="0"
          max="120"
          disabled={isLoading}
          className={errors.age ? 'border-destructive' : ''}
        />
        {errors.age && (
          <p className="text-xs text-destructive mt-1">{errors.age}</p>
        )}
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : initialData ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </motion.form>
  );
};

export default UserForm;
