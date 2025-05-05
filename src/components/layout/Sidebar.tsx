import React from 'react';
import { Project } from '../../types';
import { Home, Briefcase, Settings, Users, BarChart2, PlusCircle, Search } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  projects: Project[];
  selectedProjectId: string | null;
  onProjectSelect: (projectId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  projects, 
  selectedProjectId, 
  onProjectSelect 
}) => {
  return (
    <div className="h-full w-64 bg-gray-900 text-gray-300 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-semibold text-white">Project Tracker</h1>
      </div>
      
      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-500" />
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full py-2 pl-10 pr-4 bg-gray-800 text-sm text-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-gray-700"
          />
        </div>
      </div>
      
      {/* Main menu */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md bg-gray-800 text-white">
          <Home size={18} className="mr-3 text-gray-300" />
          Dashboard
        </a>
        <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
          <BarChart2 size={18} className="mr-3 text-gray-400 group-hover:text-gray-300" />
          Reports
        </a>
        <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
          <Users size={18} className="mr-3 text-gray-400 group-hover:text-gray-300" />
          Team
        </a>
        <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
          <Settings size={18} className="mr-3 text-gray-400 group-hover:text-gray-300" />
          Settings
        </a>
      </nav>
      
      {/* Projects section */}
      <div className="px-3 py-3 mt-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Projects</h3>
          <button className="text-gray-400 hover:text-white">
            <PlusCircle size={16} />
          </button>
        </div>
        <div className="space-y-1">
          {projects.map(project => (
            <button
              key={project.id}
              onClick={() => onProjectSelect(project.id)}
              className={cn(
                'group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md',
                project.id === selectedProjectId
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              )}
            >
              <Briefcase size={16} className="mr-3 text-gray-400 group-hover:text-gray-300" />
              <span className="truncate">{project.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* User profile */}
      <div className="p-4 border-t border-gray-800 mt-auto flex items-center">
        <img
          className="h-8 w-8 rounded-full"
          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="User"
        />
        <div className="ml-3">
          <p className="text-sm font-medium text-white">Alex Johnson</p>
          <p className="text-xs text-gray-400">View profile</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;