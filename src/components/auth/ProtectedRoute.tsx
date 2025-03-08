import React from 'react';
import { Navigate } from 'react-router-dom';
import { useWalletContext } from '../../context/WalletContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { account, isKeychainInstalled } = useWalletContext();

  // If Keychain is not installed or user is not logged in, redirect to login page
  if (!isKeychainInstalled || !account) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}; 