import React from 'react';
import { Task, TaskStatus, User } from '../../types';
import TaskCard from '../task/TaskCard';
import { Plus } from 'lucide-react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  users: User[];
  onTaskClick: (task: Task) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  title, 
  status,
  tasks,
  users,
  onTaskClick 
}) => {
  return (
    <div className="flex flex-col w-80 bg-gray-50 rounded-md p-2">
      <div className="flex items-center justify-between mb-2 px-2 py-1">
        <h3 className="font-medium text-sm text-gray-700">
          {title} <span className="text-gray-500 ml-1">{tasks.length}</span>
        </h3>
        <button className="text-gray-400 hover:text-indigo-600">
          <Plus size={16} />
        </button>
      </div>
      <div 
        className="flex-1 overflow-y-auto space-y-2"
        data-status={status}
      >
        <SortableContext 
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map(task => (
            <TaskCard 
              key={task.id}
              task={task}
              users={users}
              onClick={onTaskClick}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

interface KanbanBoardProps {
  tasks: Task[];
  users: User[];
  onTaskClick: (task: Task) => void;
  onTaskMove?: (taskId: string, newStatus: TaskStatus) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
  tasks, 
  users,
  onTaskClick,
  onTaskMove 
}) => {
  const [activeTask, setActiveTask] = React.useState<Task | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Define columns with their titles
  const columns: { title: string; status: TaskStatus }[] = [
    { title: 'Backlog', status: 'backlog' },
    { title: 'To Do', status: 'todo' },
    { title: 'In Progress', status: 'in-progress' },
    { title: 'In Review', status: 'in-review' },
    { title: 'Done', status: 'done' },
  ];

  // Filter tasks by status for each column
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const container = event.over?.data.current?.sortable?.containerId;
    if (container) {
      console.log('Container:', container);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const taskId = event.active.id as string;
    const overId = event.over?.id;

    if (!overId) {
      setActiveTask(null);
      return;
    }

    // Find the container (column) where the task was dropped
    const container = event.over.data.current?.sortable?.containerId;
    if (!container) {
      const overElement = document.elementFromPoint(event.over.rect.left, event.over.rect.top);
      const column = overElement?.closest('[data-status]');
      if (column) {
        const newStatus = column.getAttribute('data-status') as TaskStatus;
        if (newStatus && onTaskMove) {
          onTaskMove(taskId, newStatus);
        }
      }
    }

    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex overflow-x-auto h-full p-4 pb-8 space-x-4">
        {columns.map(column => (
          <KanbanColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={getTasksByStatus(column.status)}
            users={users}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask && (
          <TaskCard
            task={activeTask}
            users={users}
            onClick={() => {}}
            className="rotate-3 cursor-grabbing"
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;