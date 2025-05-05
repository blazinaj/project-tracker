import React from 'react';
import { ArrowDown, ArrowUp, Dot, AlertTriangle } from 'lucide-react';
import { TaskPriority } from '../../types';
import Badge from '../ui/Badge';

interface PriorityBadgeProps {
  priority: TaskPriority;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getPriorityConfig = () => {
    switch (priority) {
      case 'urgent':
        return {
          icon: <AlertTriangle size={12} className="mr-1" />,
          label: 'Urgent',
          variant: 'danger' as const,
        };
      case 'high':
        return {
          icon: <ArrowUp size={12} className="mr-1" />,
          label: 'High',
          variant: 'warning' as const,
        };
      case 'medium':
        return {
          icon: <Dot size={12} className="mr-1" />,
          label: 'Medium',
          variant: 'primary' as const,
        };
      case 'low':
        return {
          icon: <ArrowDown size={12} className="mr-1" />,
          label: 'Low',
          variant: 'default' as const,
        };
      default:
        return {
          icon: <Dot size={12} className="mr-1" />,
          label: 'Medium',
          variant: 'primary' as const,
        };
    }
  };

  const { icon, label, variant } = getPriorityConfig();

  return (
    <Badge variant={variant} size="sm" className="inline-flex items-center">
      {icon}
      <span>{label}</span>
    </Badge>
  );
};

export default PriorityBadge;