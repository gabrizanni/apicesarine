import { Routes, Route } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminLayout } from '@/components/admin/AdminLayout';

const Admin = () => {
  const { isAuthenticated, isLoading, login, logout } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Caricamento...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <Routes>
      <Route path="/*" element={<AdminLayout onLogout={logout} />} />
    </Routes>
  );
};

export default Admin;