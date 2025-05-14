# Project Tracker - AI-Generated Project Management Application

A modern, AI-generated project and task management application inspired by Jira, built with React and TypeScript. This application showcases the power of AI-assisted development while delivering a production-ready solution for project management needs.

## About This AI-Generated Application

This project is built using advanced AI technology, demonstrating how AI can assist in creating production-ready applications. Key aspects of the AI generation process include:

- Complete application architecture and structure
- Implementation of React and TypeScript best practices
- Secure authentication system using Supabase
- Modern, responsive UI design with Tailwind CSS
- Comprehensive documentation and testing setup
- Database schema design with proper security policies

## Features

### Current Features

#### Authentication & User Management
- 🔐 Secure email/password authentication
- 👤 User profiles with avatars
- 🔑 Password reset functionality

#### Organization Management
- 👥 Multi-organization support
- 👑 Role-based access control (Owner, Admin, Member)
- 🏢 Organization creation and management

#### Project Management
- 📋 Project creation and configuration
- 📊 Kanban board with drag-and-drop
- 📱 Responsive design for all devices
- 🔍 Advanced search and filtering
- 🏷️ Task prioritization
- 📈 Multiple view modes (Board/List)

## Technology Stack

### Core Technologies
- ⚛️ React 18.3 with TypeScript 5.5
- 🎨 Tailwind CSS 3.4
- 🗃️ Supabase for auth and database
- 🛠️ Vite 5.4 for development

### Key Libraries
- 🔄 @dnd-kit/core for drag-and-drop
- 🎯 React Context for state management
- 🎨 Lucide React for icons
- 📱 Modern CSS features and Flexbox

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/project-tracker.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update with your Supabase credentials

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard components
│   ├── layout/         # Layout components
│   ├── organization/   # Organization management
│   ├── task/          # Task-related components
│   └── ui/            # Reusable UI components
├── contexts/          # React contexts
├── lib/               # Library configurations
├── types/             # TypeScript definitions
├── utils/             # Utility functions
└── App.tsx            # Main component
```

## Database Schema

The application uses Supabase with the following main tables:
- `organizations`: Organization management
- `organization_members`: User roles and permissions
- `profiles`: User profiles
- `projects`: Project details and configuration

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.