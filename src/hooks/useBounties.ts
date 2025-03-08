import { useState, useEffect } from 'react';
import { client } from '../config/hive.config';
import { Bounty } from '../types/hive.types';
import { sendHiveTokens } from '../utils/hive';

export const useBounties = () => {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBounties = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Implement actual bounty fetching from Hive blockchain
      // This is a placeholder implementation
      const response = await client.database.getDiscussions('created', { tag: 'bounty', limit: 20 });
      const parsedBounties = response.map((post: any) => {
        try {
          const json = JSON.parse(post.json_metadata);
          if (json.bounty) {
            return {
              id: post.id,
              title: post.title,
              description: post.body,
              amount: json.bounty.amount,
              currency: json.bounty.currency,
              creator: post.author,
              status: json.bounty.status || 'open',
              created_at: post.created,
              deadline: json.bounty.deadline
            };
          }
          return null;
        } catch (err) {
          return null;
        }
      }).filter(Boolean);
      
      setBounties(parsedBounties);
    } catch (err) {
      setError('Failed to fetch bounties');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createBounty = async (bountyData: Omit<Bounty, 'id' | 'creator' | 'status' | 'created_at'>, username: string) => {
    try {
      // First send the tokens to escrow
      const txResponse = await sendHiveTokens(
        username,
        'bounty.escrow', // Replace with actual escrow account
        bountyData.amount,
        JSON.stringify({ type: 'bounty_creation', ...bountyData })
      );

      if (!txResponse.success) {
        throw new Error(txResponse.message);
      }

      // TODO: Create the bounty post on Hive blockchain
      // This would involve creating a post with specific tags and metadata

      return { success: true, message: 'Bounty created successfully' };
    } catch (err) {
      console.error('Failed to create bounty:', err);
      return { success: false, message: 'Failed to create bounty' };
    }
  };

  useEffect(() => {
    fetchBounties();
  }, []);

  return {
    bounties,
    loading,
    error,
    refresh: fetchBounties,
    createBounty
  };
}; 