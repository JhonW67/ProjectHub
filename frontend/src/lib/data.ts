
// Mock data for the application

// User types
export type User = {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'professor';
  course: string;
  registration?: string;
  semester?: number;
  groups?: string[];
  classes?: string[];
};

// Project types
export type Project = {
  id: string;
  title: string;
  description: string;
  banner: string;
  documentUrl?: string;
  groupId: string;
  eventId: string;
  evaluations: Evaluation[];
  feedback: Feedback[];
  createdAt: string;
  eventTitle?: string;
  type: "extension" | "research";
  tags?: string[];
  members: string[];
};

// Event types
export type Event = {
  id: string;
  title: string;
  description: string;
  theme: string;
  semester: string;
  date: string;
  location: string;
  banner: string;
  isActive: boolean;
};

// Group types
export type Group = {
  id: string;
  name: string;
  course: string;
  semester: number;
  members: string[];
  projectId?: string;
};

// Evaluation types
export type Evaluation = {
  id: string;
  projectId: string;
  professorId: string;
  professorName: string;
  score: number;
  criteria: {
    innovation: number;
    execution: number;
    presentation: number;
    impact: number;
  };
  comment: string;
  createdAt: string;
};

// Feedback types
export type Feedback = {
  id: string;
  projectId: string;
  userId?: string;
  userName: string;
  isAnonymous: boolean;
  comment: string;
  createdAt: string;
};

// Mock users
export const users: User[] = [
  {
    id: "u1",
    name: "João Silva",
    email: "joao.silva@univag.edu.br",
    type: "student",
    course: "Engenharia de Software",
    registration: "202200001",
    semester: 5,
    groups: ["g1"]
  },
  {
    id: "u2",
    name: "Maria Oliveira",
    email: "maria.oliveira@univag.edu.br",
    type: "student",
    course: "Engenharia de Software",
    registration: "202200002",
    semester: 5,
    groups: ["g1"]
  },
  {
    id: "u3",
    name: "Carlos Santos",
    email: "carlos.santos@univag.edu.br",
    type: "student",
    course: "Engenharia de Software",
    registration: "202200003",
    semester: 5,
    groups: ["g1"]
  },
  {
    id: "u4",
    name: "Profa. Ana Beatriz",
    email: "ana.beatriz@univag.edu.br",
    type: "professor",
    course: "Engenharia de Software",
    classes: ["Programação Web", "Banco de Dados"]
  },
  {
    id: "u5",
    name: "Prof. Roberto Almeida",
    email: "roberto.almeida@univag.edu.br",
    type: "professor",
    course: "Engenharia de Software",
    classes: ["Projeto Extensionista", "Engenharia de Software"]
  }
];

// Mock groups
export const groups: Group[] = [
  {
    id: "g1",
    name: "Grupo Inovação Tech",
    course: "Engenharia de Software",
    semester: 5,
    members: ["u1", "u2", "u3"],
    projectId: "p1"
  },
  {
    id: "g2",
    name: "Desenvolvedores do Futuro",
    course: "Engenharia de Software",
    semester: 5,
    members: []
  },
  {
    id: "g3",
    name: "CodeMasters",
    course: "Ciência da Computação",
    semester: 6,
    members: [],
    projectId: "p2"
  }
];

// Mock events
export const events: Event[] = [
  {
    id: "e1",
    title: "Feira de Tecnologia e Inovação 2025.1",
    description: "Apresentação dos projetos desenvolvidos pelos alunos na disciplina de Projeto Extensionista Integrador.",
    theme: "Tecnologias para Sustentabilidade",
    semester: "2025.1",
    date: "2025-06-15",
    location: "Bloco D - UNIVAG",
    banner: "/placeholder.svg",
    isActive: true
  },
  {
    id: "e2",
    title: "Feira de Projetos 2024.2",
    description: "Apresentação dos projetos desenvolvidos pelos alunos na disciplina de Projeto Extensionista Integrador.",
    theme: "Tecnologias para Saúde",
    semester: "2024.2",
    date: "2024-12-10",
    location: "Bloco C - UNIVAG",
    banner: "/placeholder.svg",
    isActive: false
  }
];

// Function to refresh event active status
export const refreshEventStatus = () => {
  const today = new Date();
  events.forEach(event => {
    const eventDate = new Date(event.date);
    event.isActive = eventDate >= today;
  });
};

// Call once to ensure events have correct active status
refreshEventStatus();

// Mock projects
export const projects: Project[] = [
  {
    id: "p1",
    title: "EcoTrack - Sistema de Monitoramento Ambiental",
    description: "Sistema de monitoramento ambiental que permite coletar, analisar e visualizar dados sobre qualidade do ar, água e solo em tempo real.",
    banner: "/placeholder.svg",
    documentUrl: "/docs/projeto-ecotrack.pdf",
    groupId: "g1",
    eventId: "e1",
    evaluations: [
      {
        id: "ev1",
        projectId: "p1",
        professorId: "u4",
        professorName: "Profa. Ana Beatriz",
        score: 9.5,
        criteria: {
          innovation: 9,
          execution: 10,
          presentation: 9,
          impact: 10
        },
        comment: "Projeto excelente com grande impacto social e ambiental.",
        createdAt: "2025-06-15T14:30:00Z"
      }
    ],
    feedback: [
      {
        id: "f1",
        projectId: "p1",
        userId: "u5",
        userName: "Prof. Roberto Almeida",
        isAnonymous: false,
        comment: "Excelente trabalho! A interface é muito intuitiva e os dados apresentados são relevantes.",
        createdAt: "2025-06-15T15:00:00Z"
      }
    ],
    createdAt: "2025-05-20T10:00:00Z"
  },
  {
    id: "p2",
    title: "MediAlert - Sistema de Alerta para Medicamentos",
    description: "Aplicativo que ajuda pacientes a gerenciar seus medicamentos, enviando alertas nos horários corretos e fornecendo informações importantes sobre cada medicamento.",
    banner: "/placeholder.svg",
    documentUrl: "/docs/projeto-medialert.pdf",
    groupId: "g3",
    eventId: "e2",
    evaluations: [
      {
        id: "ev2",
        projectId: "p2",
        professorId: "u5",
        professorName: "Prof. Roberto Almeida",
        score: 8.5,
        criteria: {
          innovation: 8,
          execution: 9,
          presentation: 8,
          impact: 9
        },
        comment: "Projeto com grande potencial para ajudar pacientes idosos.",
        createdAt: "2024-12-10T14:30:00Z"
      }
    ],
    feedback: [],
    createdAt: "2024-11-15T10:00:00Z"
  }
];

// Helper function to generate a QR code URL for a project
export const getProjectQRCodeUrl = (projectId: string): string => {
  // In a real app, this would generate a QR code
  // For now, just return a placeholder
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://projecthub.univag.edu.br/projects/${projectId}`;
};

// Helper function to get a user by ID
export const getUserById = (userId: string): User | undefined => {
  return users.find(user => user.id === userId);
};

// Helper function to get a project by ID
export const getProjectById = (projectId: string): Project | undefined => {
  return projects.find(project => project.id === projectId);
};

// Helper function to get a group by ID
export const getGroupById = (groupId: string): Group | undefined => {
  return groups.find(group => group.id === groupId);
};

// Helper function to get an event by ID
export const getEventById = (eventId: string): Event | undefined => {
  // Ensure event status is up to date
  refreshEventStatus();
  return events.find(event => event.id === eventId);
};

// Helper function to get projects by event ID
export const getProjectsByEventId = (eventId: string): Project[] => {
  return projects.filter(project => project.eventId === eventId);
};

// Helper function to get projects by group ID
export const getProjectsByGroupId = (groupId: string): Project[] => {
  return projects.filter(project => project.groupId === groupId);
};

// Helper function to get groups by course
export const getGroupsByCourse = (course: string): Group[] => {
  return groups.filter(group => group.course === course);
};

// Helper function to get active events
export const getActiveEvents = (): Event[] => {
  // Ensure event status is up to date
  refreshEventStatus();
  return events.filter(event => event.isActive);
};

// Helper function to format date string to local date format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
export function formatDateIN(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}