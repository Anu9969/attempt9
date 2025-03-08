import { TransactionResponse } from '../types/hive.types';
import { BountyProgram, BountyClaim } from '../types/bounty.types';
import { sendHiveTokens } from '../utils/hive';
import { CONTRACT_ACCOUNT } from '../config/hive.config';

export class BountyContract {
  private username: string;

  constructor(username: string) {
    this.username = username;
  }

  // Create new bounty
  async createBounty(bountyData: Omit<BountyProgram, 'id' | 'creator' | 'status' | 'created'>): Promise<TransactionResponse> {
    // First, transfer HIVE to contract account
    const fundResult = await sendHiveTokens(
      this.username,
      CONTRACT_ACCOUNT,
      bountyData.prizePool.toString(),
      `bounty-create-${Date.now()}`
    );

    if (!fundResult.success) {
      return fundResult;
    }

    // Create bounty record
    const bounty: BountyProgram = {
      id: fundResult.txId!,
      creator: this.username,
      status: 'OPEN',
      created: new Date().toISOString(),
      ...bountyData
    };

    // Store bounty data on chain (using custom_json)
    return new Promise((resolve) => {
      // @ts-ignore
      window.hive_keychain.requestCustomJson(
        this.username,
        CONTRACT_ACCOUNT,
        'Active',
        JSON.stringify(bounty),
        'bounty-create',
        (response: any) => {
          if (response.success) {
            resolve({
              success: true,
              message: 'Bounty created successfully',
              txId: response.result.id
            });
          } else {
            resolve({
              success: false,
              message: response.error || 'Failed to create bounty'
            });
          }
        }
      );
    });
  }

  // Claim bounty with PR
  async claimBounty(claim: Omit<BountyClaim, 'solver' | 'timestamp'>): Promise<TransactionResponse> {
    const claimData: BountyClaim = {
      ...claim,
      solver: this.username,
      timestamp: new Date().toISOString()
    };

    return new Promise((resolve) => {
      // @ts-ignore
      window.hive_keychain.requestCustomJson(
        this.username,
        CONTRACT_ACCOUNT,
        'Active',
        JSON.stringify(claimData),
        'bounty-claim',
        (response: any) => {
          if (response.success) {
            resolve({
              success: true,
              message: 'Claim submitted successfully',
              txId: response.result.id
            });
          } else {
            resolve({
              success: false,
              message: response.error || 'Failed to submit claim'
            });
          }
        }
      );
    });
  }

  // Verify and pay bounty
  async verifyAndPayBounty(
    bountyId: string,
    solver: string
  ): Promise<TransactionResponse> {
    // Only bounty creator can verify and pay
    return sendHiveTokens(
      CONTRACT_ACCOUNT,
      solver,
      '0', // Amount will be fetched from bounty data
      `bounty-paid-${bountyId}`
    );
  }
}







//updated for escrow indtead of simpcontract transfer

// import { TransactionResponse } from '../types/hive.types';
// import { BountyProgram, BountyClaim } from '../types/bounty.types';
// import { sendHiveTokens } from '../utils/hive';
// import { CONTRACT_ACCOUNT } from '../config/hive.config';
// import { escrowUtils } from '../utils/escrow';

// export class BountyContract {
//   private username: string;

//   constructor(username: string) {
//     this.username = username;
//   }

//   // Replace your existing createBounty method with this
//   async createBountyEscrow(bountyData: {
//     title: string;
//     description: string;
//     githubLink: string;
//     prizePool: number;
//   }): Promise<TransactionResponse> {
//     try {
//       // Step 1: Lock funds in escrow
//       const escrow = await escrowUtils.lockFunds(
//         this.username,
//         bountyData.prizePool,
//         Date.now().toString()
//       );

//       // Step 2: Create bounty record
//       const bountyJson = {
//         type: 'bounty_create',
//         data: {
//           ...bountyData,
//           creator: this.username,
//           escrowTx: escrow.txId,
//           status: 'OPEN',
//           created: new Date().toISOString()
//         }
//       };

//       return new Promise((resolve) => {
//         // @ts-ignore
//         window.hive_keychain.requestCustomJson(
//           this.username,
//           CONTRACT_ACCOUNT,
//           'Active',
//           JSON.stringify(bountyJson),
//           'bounty-create',
//           async (response: any) => {
//             if (response.success) {
//               resolve({
//                 success: true,
//                 message: 'Bounty created and funds escrowed',
//                 txId: response.result.id
//               });
//             } else {
//               // Refund if bounty creation fails
//               await escrowUtils.refundFunds(escrow);
//               resolve({
//                 success: false,
//                 message: 'Failed to create bounty'
//               });
//             }
//           }
//         );
//       });
//     } catch (error) {
//       console.error('Bounty creation error:', error);
//       throw error;
//     }
//   }

//   // Add these new methods to your contract class
//   async verifyAndReleaseBounty(
//     bountyId: string,
//     claim: BountyClaim
//   ): Promise<TransactionResponse> {
//     // ... copy the verifyAndReleaseBounty method from previous message
//   }

//   async cancelBounty(bountyId: string): Promise<TransactionResponse> {
//     // ... copy the cancelBounty method from previous message
//   }

//   // Update your existing methods to work with escrow
//   async getBountyDetails(bountyId: string): Promise<BountyProgram | null> {
//     // ... copy the getBountyDetails method from previous message
//   }
// }