
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/types';
import { Edit, Trash2, User as UserIcon } from 'lucide-react';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  isDeleting: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onEdit, 
  onDelete,
  isDeleting
}) => {
  const { id, name, email, age, createdAt } = user;
  const createdDate = new Date(createdAt).toLocaleDateString();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      layout
      className="card-hover"
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center bg-primary/10 rounded-full w-8 h-8">
                <UserIcon className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-lg font-medium">{name}</CardTitle>
            </div>
            <div className="text-xs px-2 py-1 bg-muted rounded-full">
              ID: {id.substring(0, 8)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium text-muted-foreground">Email: </span>
              <span>{email}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium text-muted-foreground">Age: </span>
              <span>{age}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Created on {createdDate}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-3 flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => onEdit(user)}
          >
            <Edit className="h-3.5 w-3.5" />
            <span>Edit</span>
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => onDelete(id)}
            disabled={isDeleting}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default UserCard;
