import React from 'react';
import Button from '../ui/Button';
import { 
  Search, 
  Filter, 
  SortAsc, 
  LayoutGrid, 
  List
} from 'lucide-react';
import { TaskPriority, TaskStatus, User } from '../../types';

interface TaskToolbarProps {
  statusFilter: TaskStatus | 'all';
  priorityFilter: TaskPriority | 'all';
  assigneeFilter: string | 'all';
  searchQuery: string;
  users: User[];
  onStatusFilterChange: (status: TaskStatus | 'all') => void;
  onPriorityFilterChange: (priority: TaskPriority | 'all') => void;
  onAssigneeFilterChange: (assigneeId: string | 'all') => void;
  onSearchQueryChange: (query: string) => void;
  onViewModeChange: (mode: 'board' | 'list') => void;
  viewMode: 'board' | 'list';
}

const TaskToolbar: React.FC<TaskToolbarProps> = ({
  statusFilter,
  priorityFilter,
  assigneeFilter,
  searchQuery,
  users,
  onStatusFilterChange,
  onPriorityFilterChange,
  onAssigneeFilterChange,
  onSearchQueryChange,
  onViewModeChange,
  viewMode,
}) => {
  const statuses: { value: TaskStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All Statuses' },
    { value: 'backlog', label: 'Backlog' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'in-review', label: 'In Review' },
    { value: 'done', label: 'Done' },
  ];

  const priorities: { value: TaskPriority | 'all'; label: string }[] = [
    { value: 'all', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
  ];

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Left side - Search and filters */}
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative flex-1 max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Filter size={16} className="text-gray-500 mr-2" />
              <select
                className="border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value as TaskStatus | 'all')}
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            
            <select
              className="border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={priorityFilter}
              onChange={(e) => onPriorityFilterChange(e.target.value as TaskPriority | 'all')}
            >
              {priorities.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
            
            <select
              className="border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={assigneeFilter}
              onChange={(e) => onAssigneeFilterChange(e.target.value)}
            >
              <option value="all">All Assignees</option>
              <option value="unassigned">Unassigned</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Right side - Sort and view options */}
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<SortAsc size={16} />}
          >
            Sort
          </Button>
          
          <div className="border border-gray-300 rounded-md flex">
            <button
              className={`px-3 py-1 ${
                viewMode === 'board'
                  ? 'bg-gray-100 text-gray-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => onViewModeChange('board')}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              className={`px-3 py-1 ${
                viewMode === 'list'
                  ? 'bg-gray-100 text-gray-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => onViewModeChange('list')}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskToolbar;