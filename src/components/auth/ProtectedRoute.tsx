import React from 'react';
import { Navigate } from 'react-router-dom';
import { useWalletContext } from '../../context/WalletContext';
import { WalletConnect } from '../wallet/WalletConnect';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { account, isKeychainInstalled } = useWalletContext();

  if (!isKeychainInstalled) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hive Keychain Required
          </h2>
          <p className="text-gray-600 mb-6">
            To access this feature, you need to install the Hive Keychain extension.
          </p>
          <a
            href="https://hive-keychain.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Install Hive Keychain
          </a>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 mb-6">
            Please connect your Hive wallet to access this feature.
          </p>
          <WalletConnect />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}; 