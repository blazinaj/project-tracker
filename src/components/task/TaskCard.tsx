import React from 'react';
import { Task, User } from '../../types';
import PriorityBadge from './PriorityBadge';
import Avatar from '../ui/Avatar';
import { Calendar, MessageSquare } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '../../utils/cn';

interface TaskCardProps {
  task: Task;
  users: User[];
  onClick: (task: Task) => void;
  className?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  users, 
  onClick,
  className 
}) => {
  const assignee = task.assigneeId ? users.find(user => user.id === task.assigneeId) : undefined;
  const commentCount = task.comments.length;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: task,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "bg-white rounded-md shadow-sm border border-gray-200 p-4 cursor-grab active:cursor-grabbing transition-all hover:shadow-md",
        isDragging && "opacity-50",
        className
      )}
      onClick={() => onClick(task)}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs text-gray-500 font-medium">
          {task.projectId.toUpperCase()}-{task.id.toUpperCase()}
        </span>
        <PriorityBadge priority={task.priority} />
      </div>
      
      <h3 className="text-sm font-medium text-gray-900 mb-2">{task.title}</h3>
      
      <div className="text-xs text-gray-500 line-clamp-2 mb-3">
        {task.description}
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-2">
          {assignee ? (
            <Avatar src={assignee.avatarUrl} alt={assignee.name} size="xs" />
          ) : (
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
              <span className="text-xs">?</span>
            </div>
          )}
          
          {task.dueDate && (
            <div className="flex items-center text-xs text-gray-500">
              <Calendar size={12} className="mr-1" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>
        
        {commentCount > 0 && (
          <div className="flex items-center text-xs text-gray-500">
            <MessageSquare size={12} className="mr-1" />
            <span>{commentCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;