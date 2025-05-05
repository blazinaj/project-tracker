export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'in-review' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  reporterId: string;
  projectId: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  timeEstimate?: number; // in minutes
  timeSpent?: number; // in minutes
  comments: Comment[];
}

export interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  leadId: string;
  members: string[]; // user ids
  createdAt: Date;
}

export interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  selectedTask: Task | null;
  filterStatus: TaskStatus | 'all';
  filterPriority: TaskPriority | 'all';
  filterAssignee: string | 'all';
  searchQuery: string;
}

export interface UserState {
  currentUser: User | null;
  users: User[];
}

export interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
}