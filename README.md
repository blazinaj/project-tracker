# Project Tracker

A modern project and task management application inspired by Jira, built with React and TypeScript. View the live demo: [Project Tracker](https://amazing-croissant-43ae05.netlify.app)

![Project Tracker Screenshot](https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 📋 Kanban board with drag-and-drop task management
- 📱 Responsive design that works on desktop and mobile
- 🔍 Advanced filtering and search capabilities
- 📊 Multiple view modes (Board/List)
- 🏷️ Task prioritization and status tracking
- 👥 User assignment and management
- 🏷️ Tag support for better organization
- ⏱️ Time tracking functionality
- 💬 Commenting system on tasks

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **State Management**: React Hooks and Context
- **Drag and Drop**: @dnd-kit for smooth drag-and-drop functionality
- **Icons**: Lucide React for beautiful, consistent icons
- **Build Tool**: Vite for fast development and optimized builds
- **Deployment**: Netlify for reliable hosting

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/         # React components
│   ├── dashboard/     # Dashboard-related components
│   ├── layout/        # Layout components
│   ├── task/         # Task-related components
│   └── ui/           # Reusable UI components
├── data/             # Mock data for demonstration
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── App.tsx           # Main application component
```

## Key Features Explained

### Kanban Board
- Drag-and-drop interface for task management
- Visual task organization by status
- Real-time updates when moving tasks

### Task Management
- Create, edit, and delete tasks
- Set priority levels and status
- Assign tasks to team members
- Add tags for categorization
- Track time estimates and spent time

### Filtering and Search
- Filter tasks by status, priority, and assignee
- Search tasks by title and description
- Toggle between board and list views

### User Interface
- Clean, modern design
- Responsive layout
- Intuitive navigation
- Real-time updates

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.