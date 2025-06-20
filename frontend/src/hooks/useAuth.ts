import { useEffect, useState } from "react";
import { useContext } from "react";
import  AuthContext  from "@/components/auth/AuthContext";

// Simulação de autenticação. Em um projeto real, isso viria de um contexto global ou sessão.
export type UserType = "student" | "professor" | "admin";

interface User {
  id: string;
  name: string;
  type: UserType;
  email: string;
  role: string;
}

export const useLocalAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aqui você pode integrar com sua API de autenticação
    
    // ou buscar do localStorage/sessionStorage, por exemplo.
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};

// useAuth hook should only be used inside components or other hooks, not at the top level.
export const useAuth = () => useContext(AuthContext);
