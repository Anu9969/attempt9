import React from 'react';
import { Link } from 'react-router-dom';
import { WalletConnect } from '../components/wallet/WalletConnect';
import { BountyCard } from '../components/bounty/BountyCard';
import { useBounties } from '../hooks/useBounties';

const Home = () => {
  const { bounties, loading, error, refresh } = useBounties();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Hive Bounties</h1>
            <WalletConnect />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Active Bounties</h2>
            {error && (
              <p className="text-red-600 mt-1">{error}</p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={refresh}
              className="text-gray-600 hover:text-gray-900"
            >
              ↻ Refresh
            </button>
            <Link 
              to="/create" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Create Bounty
            </Link>
          </div>
        </div>
        
        {loading ? (
          <p className="text-gray-600 text-center py-8">Loading bounties...</p>
        ) : bounties.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bounties.map(bounty => (
              <BountyCard key={bounty.id} bounty={bounty} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">
            No bounties available yet. Be the first to create one!
          </p>
        )}
      </main>
    </div>
  );
};

export default Home;