import React from 'react';
import { ClipboardList, ArrowRight, CheckCircle2, RotateCcw, Inbox } from 'lucide-react';
import { TaskStatus } from '../../types';
import Badge from '../ui/Badge';

interface StatusBadgeProps {
  status: TaskStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'backlog':
        return {
          icon: <Inbox size={12} className="mr-1" />,
          label: 'Backlog',
          variant: 'default' as const,
        };
      case 'todo':
        return {
          icon: <ClipboardList size={12} className="mr-1" />,
          label: 'To Do',
          variant: 'secondary' as const,
        };
      case 'in-progress':
        return {
          icon: <ArrowRight size={12} className="mr-1" />,
          label: 'In Progress',
          variant: 'primary' as const,
        };
      case 'in-review':
        return {
          icon: <RotateCcw size={12} className="mr-1" />,
          label: 'In Review',
          variant: 'warning' as const,
        };
      case 'done':
        return {
          icon: <CheckCircle2 size={12} className="mr-1" />,
          label: 'Done',
          variant: 'success' as const,
        };
      default:
        return {
          icon: <ClipboardList size={12} className="mr-1" />,
          label: 'To Do',
          variant: 'secondary' as const,
        };
    }
  };

  const { icon, label, variant } = getStatusConfig();

  return (
    <Badge variant={variant} size="sm" className="inline-flex items-center">
      {icon}
      <span>{label}</span>
    </Badge>
  );
};

export default StatusBadge;