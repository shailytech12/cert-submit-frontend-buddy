
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAdminAuthenticated } from "@/utils/adminAuth";

interface AdminProtectedRouteProps {
  children: React.ReactElement;
}

export function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const location = useLocation();
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return children;
}
