import React, { useState, useEffect } from 'react';
import { 
  Task, 
  Project, 
  User, 
  TaskStatus, 
  TaskPriority 
} from './types';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import KanbanBoard from './components/dashboard/KanbanBoard';
import ListView from './components/dashboard/ListView';
import TaskDetail from './components/task/TaskDetail';
import TaskToolbar from './components/dashboard/TaskToolbar';
import CreateTaskModal from './components/task/CreateTaskModal';
import { projects, tasks as initialTasks, users, currentUser } from './data/dummyData';

function App() {
  // State
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    projects.length > 0 ? projects[0].id : null
  );
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [projectTasks, setProjectTasks] = useState<Task[]>([]);

  // Effects
  useEffect(() => {
    if (selectedProjectId) {
      const filteredTasks = tasks.filter(task => task.projectId === selectedProjectId);
      setProjectTasks(filteredTasks);
    } else {
      setProjectTasks([]);
    }
  }, [selectedProjectId, tasks]);

  // Get the selected project
  const selectedProject = selectedProjectId 
    ? projects.find(project => project.id === selectedProjectId) || null
    : null;

  // Apply filters to tasks
  const filteredTasks = projectTasks.filter(task => {
    // Status filter
    if (statusFilter !== 'all' && task.status !== statusFilter) {
      return false;
    }
    
    // Priority filter
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
      return false;
    }
    
    // Assignee filter
    if (assigneeFilter !== 'all') {
      if (assigneeFilter === 'unassigned' && task.assigneeId) {
        return false;
      } else if (assigneeFilter !== 'unassigned' && task.assigneeId !== assigneeFilter) {
        return false;
      }
    }
    
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Handlers
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCreateTask = (taskData: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    assigneeId?: string;
    tags: string[];
  }) => {
    // In a real app, this would be an API call to create the task
    console.log('Creating task:', taskData);
    
    // Mock task creation
    const newTask: Task = {
      id: `t${tasks.length + 1}`,
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      priority: taskData.priority,
      assigneeId: taskData.assigneeId,
      reporterId: currentUser.id,
      projectId: selectedProjectId!,
      tags: taskData.tags,
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: [],
    };
    
    // Update tasks state
    setTasks([...tasks, newTask]);
    
    // Close the modal
    setIsCreateModalOpen(false);
  };

  const handleTaskMove = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus, updatedAt: new Date() }
          : task
      )
    );
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar 
        projects={projects} 
        selectedProjectId={selectedProjectId}
        onProjectSelect={setSelectedProjectId}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          selectedProject={selectedProject}
          onCreateTask={() => setIsCreateModalOpen(true)}
        />
        
        {/* Task toolbar */}
        <TaskToolbar
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          assigneeFilter={assigneeFilter}
          searchQuery={searchQuery}
          users={users}
          onStatusFilterChange={setStatusFilter}
          onPriorityFilterChange={setPriorityFilter}
          onAssigneeFilterChange={setAssigneeFilter}
          onSearchQueryChange={setSearchQuery}
          onViewModeChange={setViewMode}
          viewMode={viewMode}
        />
        
        {/* Task content */}
        <div className="flex-1 overflow-auto">
          {viewMode === 'board' ? (
            <KanbanBoard
              tasks={filteredTasks}
              users={users}
              onTaskClick={handleTaskClick}
              onTaskMove={handleTaskMove}
            />
          ) : (
            <ListView
              tasks={filteredTasks}
              users={users}
              onTaskClick={handleTaskClick}
            />
          )}
        </div>
      </div>

      {/* Task detail modal */}
      {selectedTask && selectedProject && (
        <TaskDetail
          task={selectedTask}
          project={selectedProject}
          users={users}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {/* Create task modal */}
      {isCreateModalOpen && selectedProject && (
        <CreateTaskModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreateTask}
          project={selectedProject}
          users={users}
        />
      )}
    </div>
  );
}

export default App;