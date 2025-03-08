import { useState, useEffect } from 'react';
import { isKeychainInstalled, connectWithKeychain, HiveAccount } from '../utils/hive';

export const useWallet = () => {
  const [account, setAccount] = useState<HiveAccount | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved username in localStorage
    const savedUsername = localStorage.getItem('hiveUsername');
    if (savedUsername) {
      handleConnect(savedUsername);
    }
  }, []);

  const handleConnect = async (username: string) => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const response = await connectWithKeychain(username);
      if (response.success && response.account) {
        setAccount(response.account);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to connect wallet');
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    localStorage.removeItem('hiveUsername');
    setAccount(null);
  };

  return {
    account,
    isConnecting,
    error,
    isKeychainInstalled: isKeychainInstalled(),
    connect: handleConnect,
    disconnect
  };
}; 