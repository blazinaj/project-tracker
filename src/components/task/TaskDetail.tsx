import React from 'react';
import { Project, Task, User } from '../../types';
import { X, Calendar, Clock, LinkIcon, ArrowUpRight, MessageSquare } from 'lucide-react';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import Avatar from '../ui/Avatar';
import { formatDate, formatDateTime, getRelativeTime } from '../../utils/formatDate';

interface TaskDetailProps {
  task: Task;
  project: Project;
  users: User[];
  onClose: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ 
  task, 
  project, 
  users, 
  onClose 
}) => {
  const reporter = users.find(user => user.id === task.reporterId);
  const assignee = task.assigneeId ? users.find(user => user.id === task.assigneeId) : undefined;
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 font-medium">
              {project.key}-{task.id.toUpperCase()}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Left column - Description and comments */}
            <div className="col-span-2">
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                <div className="text-gray-700 text-sm whitespace-pre-line">
                  {task.description || "No description provided."}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                  <MessageSquare size={16} className="mr-2" />
                  Comments
                </h3>
                
                {task.comments.length > 0 ? (
                  <div className="space-y-4">
                    {task.comments.map(comment => {
                      const author = users.find(user => user.id === comment.authorId);
                      return (
                        <div key={comment.id} className="flex space-x-3">
                          <Avatar
                            src={author?.avatarUrl}
                            alt={author?.name || 'Unknown user'}
                            size="sm"
                          />
                          <div>
                            <div className="flex items-baseline">
                              <span className="text-sm font-medium text-gray-900">{author?.name}</span>
                              <span className="ml-2 text-xs text-gray-500">{getRelativeTime(comment.createdAt)}</span>
                            </div>
                            <div className="mt-1 text-sm text-gray-700">
                              {comment.content}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 py-4">
                    No comments yet. Be the first to comment!
                  </div>
                )}
                
                <div className="mt-4">
                  <textarea
                    placeholder="Add a comment..."
                    className="w-full rounded-md border border-gray-300 shadow-sm p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    rows={3}
                  />
                  <div className="mt-2 flex justify-end">
                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Details and metadata */}
            <div className="col-span-1">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">STATUS</h3>
                  <StatusBadge status={task.status} />
                </div>
                
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">PRIORITY</h3>
                  <PriorityBadge priority={task.priority} />
                </div>
                
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">ASSIGNEE</h3>
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
                    <div className="text-sm text-gray-500">Unassigned</div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">REPORTER</h3>
                  {reporter && (
                    <div className="flex items-center">
                      <Avatar
                        src={reporter.avatarUrl}
                        alt={reporter.name}
                        size="sm"
                      />
                      <span className="ml-2 text-sm text-gray-700">{reporter.name}</span>
                    </div>
                  )}
                </div>
                
                {task.dueDate && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-2">DUE DATE</h3>
                    <div className="flex items-center text-sm text-gray-700">
                      <Calendar size={14} className="mr-2 text-gray-500" />
                      {formatDate(task.dueDate)}
                    </div>
                  </div>
                )}
                
                {(task.timeEstimate || task.timeSpent) && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-2">TIME TRACKING</h3>
                    <div className="space-y-1">
                      {task.timeEstimate && (
                        <div className="flex items-center text-sm text-gray-700">
                          <Clock size={14} className="mr-2 text-gray-500" />
                          <span>Estimate: {Math.floor(task.timeEstimate / 60)}h {task.timeEstimate % 60}m</span>
                        </div>
                      )}
                      {task.timeSpent && (
                        <div className="flex items-center text-sm text-gray-700">
                          <Clock size={14} className="mr-2 text-gray-500" />
                          <span>Spent: {Math.floor(task.timeSpent / 60)}h {task.timeSpent % 60}m</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">CREATED</h3>
                  <div className="text-sm text-gray-700">
                    {formatDateTime(task.createdAt)}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">UPDATED</h3>
                  <div className="text-sm text-gray-700">
                    {formatDateTime(task.updatedAt)}
                  </div>
                </div>
                
                {task.tags.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-2">TAGS</h3>
                    <div className="flex flex-wrap gap-2">
                      {task.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 flex justify-between">
          <button className="text-sm text-gray-700 flex items-center hover:text-indigo-600">
            <LinkIcon size={14} className="mr-1" />
            Copy link
          </button>
          <a href="#" className="text-sm text-gray-700 flex items-center hover:text-indigo-600">
            <ArrowUpRight size={14} className="mr-1" />
            Open full page
          </a>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;