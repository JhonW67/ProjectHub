
# ProjectHub - UNIVAG Student Projects Management Platform

## 📖 About the Project

ProjectHub is a comprehensive web application designed for UNIVAG (Universidade de Várzea Grande) to facilitate the management, presentation, and evaluation of student projects. The platform serves as a centralized hub where students can showcase their work, professors can evaluate projects, and the institution can organize project-based events.

The system aims to enhance the visibility of student work, streamline project evaluation processes, and create a digital portfolio of academic achievements within the university environment.

## 🚀 Main Features

### For Students:
- Create and manage project profiles with detailed descriptions
- Upload project documentation and resources
- Collaborate with team members in groups
- Receive feedback and evaluations from professors
- Showcase their work to the university community

### For Professors:
- Evaluate student projects using standardized criteria
- Provide feedback to student teams
- View comprehensive data on student performance
- Track project progression over semesters

### For Administrators:
- Create and manage events (fairs, exhibitions, competitions)
- Monitor overall project quality across departments
- Generate reports on project performance metrics
- Manage user accounts and permissions

## 🛠️ Technologies Used

- **Frontend**:
  - React.js (with TypeScript)
  - Tailwind CSS for styling
  - shadcn/ui component library
  - React Router for navigation
  - Lucide Icons for UI elements
  - React Query for data fetching

- **Build Tools**:
  - Vite for fast development and optimized production builds
  - TypeScript for type safety and developer experience

## 🏗️ Project Architecture

The application follows a component-based architecture with a focus on reusability and maintainability:

- **Pages**: Main route components that compose the application views
- **Components**: Reusable UI elements organized by functionality
- **Hooks**: Custom React hooks for shared logic
- **Lib**: Utility functions, data handling, and business logic
- **Types**: TypeScript type definitions for the application

## 💼 Business Rules

### Projects
- Each project must be associated with a student group
- Projects must be submitted for a specific event
- Projects require a title, description, and can include additional documentation
- Projects can receive evaluations from multiple professors
- Projects can receive feedback from any user in the system

### Groups
- Groups must have at least one student member
- Groups are associated with a specific course and semester
- Each group can have only one active project at a time
- Group members have equal access to project management

### Events
- Events have start and end dates, themes, and locations
- Events may be active (upcoming/ongoing) or inactive (past)
- Events are organized by semester (e.g., 2025.1, 2024.2)
- Each event has a specific theme that guides the project focus

### Evaluations
- Evaluations can only be created by professors
- Evaluations include scores across multiple criteria (innovation, execution, presentation, impact)
- Evaluations include qualitative feedback in addition to numeric scores
- Professors can only evaluate each project once

### Users
- Users can be students, professors, or administrators
- Students belong to a specific course and semester
- Professors are associated with specific courses and classes they teach
- User permissions vary based on their role in the system

## 🚦 Getting Started

### Prerequisites
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd projecthub

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🔮 Future Enhancements

- User authentication integration
- Real-time notifications for feedback and evaluations
- Advanced analytics dashboard for institutional reporting
- Mobile application for on-the-go access
- Integration with university LMS (Learning Management System)
- QR code generation for physical event displays

## 📄 License

This project is for educational purposes and is intended for use within UNIVAG.

---

Developed with ❤️ for UNIVAG student projects
