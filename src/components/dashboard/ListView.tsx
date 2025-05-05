import React from 'react';
import { Task, User } from '../../types';
import StatusBadge from '../task/StatusBadge';
import PriorityBadge from '../task/PriorityBadge';
import Avatar from '../ui/Avatar';
import { formatDate } from '../../utils/formatDate';

interface ListViewProps {
  tasks: Task[];
  users: User[];
  onTaskClick: (task: Task) => void;
}

const ListView: React.FC<ListViewProps> = ({ 
  tasks, 
  users, 
  onTaskClick 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Task
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assignee
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((task) => {
            const assignee = task.assigneeId ? users.find(user => user.id === task.assigneeId) : undefined;
            
            return (
              <tr 
                key={task.id} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onTaskClick(task)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500 mb-1">
                      {task.projectId.toUpperCase()}-{task.id.toUpperCase()}
                    </div>
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={task.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <PriorityBadge priority={task.priority} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {assignee ? (
                    <div className="flex items-center">
                      <Avatar 
                        src={assignee.avatarUrl} 
                        alt={assignee.name} 
                        size="sm" 
                      />
                      <span className="ml-2 text-sm text-gray-700">{assignee.name}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Unassigned</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {task.dueDate ? formatDate(task.dueDate) : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;