import type { GithubResponse } from "./github-client";
import { ProgrammingLanguage, mapProgrammingLanguage } from "./language-mapper";

export interface Project {
  github: GithubResponse;
  language: ProgrammingLanguage | null;
  downloads: number | null;
}

export function createProject(githubResponse: GithubResponse): Project {
  return {
    github: githubResponse,
    language: mapProgrammingLanguage(githubResponse.mainLanguage),
    downloads: 0 // TODO: Get real value
  }
}