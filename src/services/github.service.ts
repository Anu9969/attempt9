class GitHubService {
  private baseUrl = 'https://api.github.com';

  private async request(endpoint: string) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GitHub API request failed:', error);
      throw error;
    }
  }

  async getIssueDetails(owner: string, repo: string, issueNumber: number) {
    return this.request(`/repos/${owner}/${repo}/issues/${issueNumber}`);
  }

  async getPullRequestDetails(owner: string, repo: string, prNumber: number) {
    return this.request(`/repos/${owner}/${repo}/pulls/${prNumber}`);
  }

  async getPRCommits(owner: string, repo: string, prNumber: number) {
    return this.request(`/repos/${owner}/${repo}/pulls/${prNumber}/commits`);
  }

  async verifyPRLinkedToIssue(owner: string, repo: string, prNumber: number, issueNumber: number) {
    try {
      // Get PR details
      const pr = await this.getPullRequestDetails(owner, repo, prNumber);
      
      // Check PR body for issue reference
      const issueRef = `#${issueNumber}`;
      const issueUrl = `https://github.com/${owner}/${repo}/issues/${issueNumber}`;
      
      if (pr.body && (pr.body.includes(issueRef) || pr.body.includes(issueUrl))) {
        return true;
      }
      
      // Check PR commits for issue reference
      const commits = await this.getPRCommits(owner, repo, prNumber);
      return commits.some((commit: any) => 
        commit.commit.message && (
          commit.commit.message.includes(issueRef) || 
          commit.commit.message.includes(issueUrl)
        )
      );
    } catch (error) {
      console.error('Error verifying PR-Issue link:', error);
      return false;
    }
  }

  async verifyPRCreator(prUrl: string): Promise<{
    isValid: boolean;
    username?: string;
    error?: string;
  }> {
    try {
      const urlParts = prUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/);
      if (!urlParts) {
        return { isValid: false, error: 'Invalid PR URL format' };
      }

      const [, owner, repo, prNumber] = urlParts;
      const prDetails = await this.getPullRequestDetails(owner, repo, parseInt(prNumber));

      return {
        isValid: true,
        username: prDetails.user.login
      };
    } catch (error) {
      return {
        isValid: false,
        error: 'Failed to verify PR creator'
      };
    }
  }
}

export const githubService = new GitHubService(); 