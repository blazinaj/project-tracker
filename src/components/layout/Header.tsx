import React from 'react';
import { Project } from '../../types';
import { Bell, Plus, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  selectedProject: Project | null;
  onCreateTask: () => void;
}

const Header: React.FC<HeaderProps> = ({ selectedProject, onCreateTask }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Project name */}
        <div>
          {selectedProject ? (
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {selectedProject.name}
              </h1>
              <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                <span>{selectedProject.key}</span>
              </div>
            </div>
          ) : (
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          )}
        </div>
        
        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="primary" 
            size="sm" 
            leftIcon={<Plus size={16} />}
            onClick={onCreateTask}
            disabled={!selectedProject}
          >
            Create Task
          </Button>
          
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-gray-700 ml-4 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
            
            <div className="ml-6 flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="User"
              />
              <button className="ml-2 flex items-center text-sm text-gray-700 hover:text-gray-900">
                <span className="mr-1">Alex Johnson</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;