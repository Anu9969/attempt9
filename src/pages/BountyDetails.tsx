
import { useParams } from 'react-router-dom';
import { WalletConnect } from '../components/wallet/WalletConnect';

const BountyDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Bounty Details</h1>
          <WalletConnect />
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Bounty #{id}</h2>
          {/* Add bounty details here */}
          <p className="text-gray-600">Loading bounty details...</p>
        </div>
      </main>
    </div>
  );
};

export default BountyDetails;