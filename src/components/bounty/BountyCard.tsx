import React from 'react';
import { Link } from 'react-router-dom';
import { Bounty } from '../../types/hive.types';

interface BountyCardProps {
  bounty: Bounty;
}

export const BountyCard: React.FC<BountyCardProps> = ({ bounty }) => {
  const statusColors = {
    open: 'bg-green-100 text-green-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 truncate">
          {bounty.title}
        </h3>
        <span className={`px-2 py-1 text-sm rounded-full ${statusColors[bounty.status]}`}>
          {bounty.status}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {bounty.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-900">
            {bounty.amount} {bounty.currency}
          </span>
          {bounty.deadline && (
            <span className="text-sm text-gray-500">
              Due: {new Date(bounty.deadline).toLocaleDateString()}
            </span>
          )}
        </div>
        
        <Link 
          to={`/bounty/${bounty.id}`}
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};
