
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import ProfessorDashboard from '@/components/dashboard/ProfessorDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import NotFound from './NotFound';
import { getUserById, User } from '@/lib/data';

const Dashboard = () => {
  const { role } = useParams<{ role: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // For demonstration purposes, we'll use a hardcoded user ID
    // In a real application, this would come from authentication
    const mockUserId = role === 'student' ? 'u1' : role === 'professor' ? 'u4' : '';
    
    if (mockUserId) {
      const userData = getUserById(mockUserId);
      setUser(userData || null);
    }
    setLoading(false);
  }, [role]);

  // Return 404 for invalid roles
  if (role !== 'student' && role !== 'professor' && role !== 'admin') {
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
            {role === 'student' && user && <StudentDashboard user={user} />}
            {role === 'professor' && user && <ProfessorDashboard user={user} />}
            {role === 'admin' && <AdminDashboard />}
            {role !== 'admin' && loading && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">Carregando informações do usuário...</p>
              </div>
            )}
            {role !== 'admin' && !loading && !user && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">Usuário não encontrado.</p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
