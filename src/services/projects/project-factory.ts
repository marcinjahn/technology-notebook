import type { GithubResponse } from "./github-client";
import { ProgrammingLanguage, mapProgrammingLanguage } from "./language-mapper";

export interface Project {
  name: string;
  description: string;
  language: ProgrammingLanguage | null;
  downloads: number | null;
  stars: number;
  createdAt: Date;
  updatedAt: Date;
  url: string;
}

export function createProject(githubResponse: GithubResponse): Project {
  return {
    name: githubResponse.name,
    description: githubResponse.description,
    language: mapProgrammingLanguage(githubResponse.mainLanguage),
    downloads: 0, // TODO: Get real value
    stars: githubResponse.stars,
    createdAt: githubResponse.createdAt,
    updatedAt: githubResponse.updatedAt,
    url: githubResponse.url
  }
}