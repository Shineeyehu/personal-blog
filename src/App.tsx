import { Routes, Route, Navigate } from "react-router-dom";
import Resume from "@/pages/Resume";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/blog" replace />} />
        <Route path="/blog" element={<Resume />} />
        <Route path="/resume" element={<div className="text-center text-xl p-8">此页面已迁移至博客</div>} />
        <Route path="/other" element={<div className="text-center text-xl p-8">页面开发中...</div>} />
      </Routes>
    </AuthContext.Provider>
  );
}
