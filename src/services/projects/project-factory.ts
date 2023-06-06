import type { DownloadsCounterResult } from "./download-counters/downloads-counter";
import type { GithubResponse } from "./github-client";
import { ProgrammingLanguage, mapProgrammingLanguage } from "./language-mapper";

export interface Project {
  name: string;
  description: string;
  language: ProgrammingLanguage | null;
  downloads: DownloadsCounterResult | null;
  stars: number;
  createdAt: Date;
  updatedAt: Date;
  url: string;
}

export function createProject(
  githubResponse: GithubResponse, 
  downloads: DownloadsCounterResult | null): Project 
{
  return {
    name: githubResponse.name,
    description: githubResponse.description,
    language: mapProgrammingLanguage(githubResponse.mainLanguage),
    downloads: downloads,
    stars: githubResponse.stars,
    createdAt: githubResponse.createdAt,
    updatedAt: githubResponse.updatedAt,
    url: githubResponse.url
  }
}