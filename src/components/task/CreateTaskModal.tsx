import React, { useState } from 'react';
import { Project, TaskPriority, TaskStatus, User } from '../../types';
import { X } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

interface CreateTaskModalProps {
  onClose: () => void;
  onSave: (taskData: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    assigneeId?: string;
    tags: string[];
  }) => void;
  project: Project;
  users: User[];
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  onClose,
  onSave,
  project,
  users,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [assigneeId, setAssigneeId] = useState<string | undefined>(undefined);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const statuses: { value: TaskStatus; label: string }[] = [
    { value: 'backlog', label: 'Backlog' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'in-review', label: 'In Review' },
    { value: 'done', label: 'Done' },
  ];

  const priorities: { value: TaskPriority; label: string }[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      status,
      priority,
      assigneeId,
      tags,
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 font-medium">
              {project.key} / New task
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Create Task</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  >
                    {statuses.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    id="priority"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  >
                    {priorities.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
                  Assignee
                </label>
                <select
                  id="assignee"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={assigneeId || ''}
                  onChange={(e) => setAssigneeId(e.target.value || undefined)}
                >
                  <option value="">Unassigned</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    id="tags"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Add a tag and press Enter"
                  />
                  <button
                    type="button"
                    className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={addTag}
                  >
                    Add
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                        <button
                          type="button"
                          className="ml-1.5 h-4 w-4 inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                          onClick={() => removeTag(tag)}
                        >
                          <span className="sr-only">Remove tag {tag}</span>
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;