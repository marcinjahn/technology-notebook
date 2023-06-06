import type { GithubResponse } from "./github-client";
import { Project, createProject } from "./project-factory";

export function getMockProjects(): GithubResponse[] {
  return [
    {
      name: 'puff',
      description: 'Some description of the project',
      stars: 2,
      tags: ['gnome', 'gtk'],
      createdAt: new Date(),
      updatedAt: new Date(),
      mainLanguage: 'TypeScript',
      url: 'google.com',
    },
    {
      name: 'gnome-quicksettings-audio-devices-hider-extension',
      description: 'Some description of the project. It is a bit long on purpose to see what will happen in the user interface',
      stars: 0,
      tags: ['gnome', 'gtk'],
      createdAt: new Date(),
      updatedAt: new Date(),
      mainLanguage: 'C#',
      url: 'google.com',
    },
    {
      name: 'vuepress-plugin-feedback-panel',
      description: 'Some description of the project',
      stars: 3,
      tags: ['gnome', 'gtk'],
      createdAt: new Date(),
      updatedAt: new Date(),
      mainLanguage: 'Rust',
      url: 'google.com',
    },
    // {
    //   name: 'project 4',
    //   description: 'Some description of the project',
    //   stars: 0,
    //   tags: ['gnome', 'gtk'],
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   mainLanguage: 'JavaScript',
    //   url: 'google.com',
    // }
  ];
}