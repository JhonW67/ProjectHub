import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import ProfessorDashboard from "@/components/dashboard/ProfessorDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import NotFound from "./NotFound";
import {useAuth }from '@/hooks/useAuth';

export interface User {
  id: string;
  name: string;
  email: string;
  // Adicione outros campos necessários
}

const Dashboard = () => {
  const { token, role, userId, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId || !token) {
        setLoadingUser(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Erro ao buscar usuário");

        const userData = await res.json();
        setUser(userData);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      } finally {
        setLoadingUser(false);
      }
    };
    
    console.log("Token:", token);
    console.log("UserID:", userId);

    fetchUser();
  }, [token, userId, isLoading, isAuthenticated]);

  if (!role || (role !== "student" && role !== "professor" && role !== "admin")) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | ProjectHub UNIVAG</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            {loadingUser ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">Carregando usuário...</p>
              </div>
            ) : (
              <>
                {role === "student" && user && <StudentDashboard user={user} />}
                {role === "professor" && user && <ProfessorDashboard user={user} />}
                {role === "admin" && <AdminDashboard />}
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
