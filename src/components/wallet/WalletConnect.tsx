import React, { useState } from 'react';
import { useWallet } from '../../hooks/useWallet';

export const WalletConnect = () => {
  const { account, isConnecting, error, isKeychainInstalled, connect, disconnect } = useWallet();
  const [username, setUsername] = useState('');
  const [showInput, setShowInput] = useState(false);

  if (!isKeychainInstalled) {
    return (
      <a
        href="https://hive-keychain.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Install Hive Keychain
      </a>
    );
  }

  if (account) {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-sm">
          <span className="text-gray-500">Connected as</span>
          <span className="font-semibold text-gray-900 ml-1">@{account.name}</span>
          <span className="text-gray-500 ml-2">{account.balance} HIVE</span>
        </div>
        <button
          onClick={disconnect}
          className="text-red-600 hover:text-red-700 font-medium text-sm"
        >
          Disconnect
        </button>
      </div>
    );
  }

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      connect(username.trim());
      setShowInput(false);
      setUsername('');
    }
  };

  if (showInput) {
    return (
      <form onSubmit={handleConnect} className="flex items-center space-x-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Hive username"
          className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
          disabled={isConnecting}
        />
        <button
          type="submit"
          disabled={isConnecting || !username.trim()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded text-sm disabled:opacity-50"
        >
          {isConnecting ? 'Connecting...' : 'Connect'}
        </button>
        <button
          type="button"
          onClick={() => setShowInput(false)}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <div>
      <button
        onClick={() => setShowInput(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Connect Wallet
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}; 