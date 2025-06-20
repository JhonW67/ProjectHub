
import { toast } from "@/hooks/use-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;  // Em produção, use hash/salt
  role: 'student' | 'professor' | 'admin';
  course?: string;
  registration?: string;
  semester?: number;
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

// Simula armazenamento em banco de dados (em produção seria substituído por chamadas reais)
const users: User[] = [
  {
    id: "admin123",
    name: "Administrador",
    email: "admin@univag.edu.br",
    password: "admin123", // NUNCA use senhas em texto plano em produção!
    role: "admin",
    createdAt: new Date()
  },
  {
    id: "prof123",
    name: "Professor Exemplo",
    email: "professor@univag.edu.br",
    password: "prof123", // NUNCA use senhas em texto plano em produção!
    role: "professor",
    course: "Engenharia de Software",
    createdAt: new Date()
  },
  {
    id: "aluno123",
    name: "Aluno Exemplo",
    email: "aluno@univag.edu.br",
    password: "aluno123", // NUNCA use senhas em texto plano em produção!
    role: "student",
    course: "Engenharia de Software",
    registration: "123456",
    semester: 5,
    createdAt: new Date()
  }
];

// Chave para o localStorage
const USER_STORAGE_KEY = 'projecthub_current_user';

export function registerUser(user: Omit<User, 'id' | 'createdAt'>): User {
  // Verifica se já existe usuário com este email
  if (findUserByEmail(user.email)) {
    throw new Error("Email já está em uso");
  }

  const newUser = {
    ...user,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date()
  };
  
  users.push(newUser);
  console.log("Usuário registrado:", newUser);
  return newUser;
}

export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}

export function findUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function authenticateUser(email: string, password: string): User | null {
  const user = findUserByEmail(email);
  
  // Em produção, deve usar comparação segura de hash
  if (user && user.password === password) {
    // Atualiza último login
    user.lastLogin = new Date();
    
    // Salva usuário na sessão (localStorage)
    saveUserSession(user);
    
    return user;
  }
  return null;
}

export function saveUserSession(user: User): void {
  // Remover senha antes de salvar no localStorage
  const { password, ...safeUser } = user;
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(safeUser));
}

export function getCurrentUser(): Omit<User, 'password'> | null {
  const userJson = localStorage.getItem(USER_STORAGE_KEY);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson);
  } catch (e) {
    console.error("Erro ao recuperar sessão do usuário:", e);
    return null;
  }
}

export function logoutUser(): void {
  localStorage.removeItem(USER_STORAGE_KEY);
}

export function getAllUsers(): Omit<User, 'password'>[] {
  // Retornar usuários sem as senhas
  return users.map(({ password, ...user }) => user);
}

export function updateUserProfile(userId: string, data: Partial<User>): User | null {
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) return null;
  
  // Não permitir atualizar role ou id
  const { role, id, ...updateData } = data;
  
  users[userIndex] = { ...users[userIndex], ...updateData };
  
  // Atualiza sessão se for o usuário atual
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    saveUserSession(users[userIndex]);
  }
  
  return users[userIndex];
}

// Função para usar em componentes de proteção de rota
export function useAuthentication() {
  const currentUser = getCurrentUser();
  
  return {
    isAuthenticated: !!currentUser,
    currentUser,
    logout: logoutUser,
    login: authenticateUser,
    register: registerUser,
  };
}
