import type { Endpoints } from "@octokit/types";

export interface GithubResponse {
  name: string;
  description: string;
  stars: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  mainLanguage: string | null;
  url: string;
}

type ListReposResponse = Endpoints["GET /users/{username}/repos"]["response"];

export async function getGithubProjects(owner: string): Promise<GithubResponse[]> {
  // Dynamically import to avoid Node.js globals issues during build
  const { Octokit } = await import("octokit");
  const octokit = new Octokit();

  let result: GithubResponse[] = [];
  let page = 1;

  let count = -1;
  while(count !== 0) {
    const pageItems = await getPage(octokit, owner, page++);
    pageItems.forEach(res => result.push(res));

    count = pageItems.length;
  }

  return result;
}

async function getPage(octokit: Octokit, owner: string, page: number): Promise<GithubResponse[]> {
  const response = await octokit.request(`GET /users/${owner}/repos`, {
    username: owner,
    page,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  if (response.status > 299) {
    throw new Error('GitHub response was unsuccessful: ' + response.status);
  }

  const data = (response as ListReposResponse).data;

  return data.map(repo => ({
    name: repo.name!,
    description: repo.description!,
    stars: repo.stargazers_count!,
    tags: repo.topics!,
    createdAt: new Date(repo.created_at!),
    updatedAt: new Date(repo.updated_at!),
    mainLanguage: repo.language ?? null,
    url: repo.html_url
  }));
}