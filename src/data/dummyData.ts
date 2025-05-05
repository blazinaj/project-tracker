import { 
  Project, 
  Task, 
  TaskPriority, 
  TaskStatus, 
  User 
} from '../types';

// Demo users
export const users: User[] = [
  {
    id: 'u1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'u2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'u3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'u4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Demo projects
export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Website Redesign',
    key: 'WEB',
    description: 'Redesign the company website with new branding',
    leadId: 'u1',
    members: ['u1', 'u2', 'u3'],
    createdAt: new Date('2023-01-15'),
  },
  {
    id: 'p2',
    name: 'Mobile App Development',
    key: 'MOB',
    description: 'Develop a new mobile app for both iOS and Android',
    leadId: 'u3',
    members: ['u2', 'u3', 'u4'],
    createdAt: new Date('2023-03-10'),
  },
  {
    id: 'p3',
    name: 'Data Analytics Platform',
    key: 'DAP',
    description: 'Build a data analytics platform for internal use',
    leadId: 'u2',
    members: ['u1', 'u2', 'u4'],
    createdAt: new Date('2023-02-22'),
  },
];

// Create tasks with appropriate data
const createTask = (
  id: string,
  title: string,
  description: string,
  status: TaskStatus,
  priority: TaskPriority,
  projectId: string,
  reporterId: string,
  assigneeId?: string,
  tags: string[] = []
): Task => {
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));
  
  const updatedAt = new Date(createdAt);
  updatedAt.setDate(updatedAt.getDate() + Math.floor(Math.random() * 7));
  
  let dueDate: Date | undefined;
  if (Math.random() > 0.3) {
    dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 14) + 1);
  }

  return {
    id,
    title,
    description,
    status,
    priority,
    projectId,
    reporterId,
    assigneeId,
    tags,
    createdAt,
    updatedAt,
    dueDate,
    timeEstimate: Math.random() > 0.5 ? Math.floor(Math.random() * 480) + 60 : undefined,
    timeSpent: Math.random() > 0.7 ? Math.floor(Math.random() * 360) : undefined,
    comments: [],
  };
};

// Demo tasks
export const tasks: Task[] = [
  // Website Redesign tasks
  createTask(
    't1',
    'Design homepage mockup',
    'Create a mockup for the new homepage design based on the approved brand guidelines.',
    'done',
    'high',
    'p1',
    'u1',
    'u2',
    ['design', 'homepage']
  ),
  createTask(
    't2',
    'Implement responsive navigation',
    'Build a responsive navigation menu that works well on all devices.',
    'in-progress',
    'medium',
    'p1',
    'u1',
    'u3',
    ['development', 'frontend']
  ),
  createTask(
    't3',
    'Optimize images for web',
    'Optimize all product images for web to improve load times.',
    'todo',
    'low',
    'p1',
    'u2',
    'u4',
    ['optimization']
  ),
  createTask(
    't4',
    'Set up analytics',
    'Set up Google Analytics and configure custom events.',
    'backlog',
    'medium',
    'p1',
    'u1',
    undefined,
    ['analytics']
  ),
  
  // Mobile App Development tasks
  createTask(
    't5',
    'Design user onboarding flow',
    'Create a user-friendly onboarding experience for new app users.',
    'in-progress',
    'high',
    'p2',
    'u3',
    'u2',
    ['design', 'onboarding']
  ),
  createTask(
    't6',
    'Implement user authentication',
    'Build a secure authentication system with email and social login options.',
    'todo',
    'high',
    'p2',
    'u3',
    'u3',
    ['development', 'security']
  ),
  createTask(
    't7',
    'Create offline mode',
    'Implement functionality to allow basic app usage without internet connection.',
    'backlog',
    'medium',
    'p2',
    'u4',
    'u4',
    ['development', 'feature']
  ),
  createTask(
    't8',
    'Beta testing',
    'Organize and conduct beta testing with a small group of users.',
    'backlog',
    'medium',
    'p2',
    'u3',
    undefined,
    ['testing']
  ),
  
  // Data Analytics Platform tasks
  createTask(
    't9',
    'Design database schema',
    'Create an efficient database schema for the analytics platform.',
    'done',
    'high',
    'p3',
    'u2',
    'u1',
    ['database', 'design']
  ),
  createTask(
    't10',
    'Implement data visualization',
    'Add interactive charts and graphs to visualize the analytics data.',
    'in-review',
    'high',
    'p3',
    'u2',
    'u4',
    ['frontend', 'visualization']
  ),
  createTask(
    't11',
    'Create export functionality',
    'Add ability to export reports in CSV and PDF formats.',
    'in-progress',
    'medium',
    'p3',
    'u4',
    'u1',
    ['feature', 'export']
  ),
  createTask(
    't12',
    'Set up automated reports',
    'Create a system for scheduling and sending automated reports.',
    'todo',
    'low',
    'p3',
    'u2',
    'u2',
    ['automation', 'reports']
  ),
];

// Export current user (for demo purposes)
export const currentUser: User = users[0];