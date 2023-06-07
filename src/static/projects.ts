import { CratesIoDownloadsCounter } from "../services/projects/download-counters/crates-io-downloads-counter";
import { ChromeExtensionsDownloadsCounter } from "../services/projects/download-counters/chrome-extensions-downlods-counter";
import type { DownloadsCounter } from "../services/projects/download-counters/downloads-counter";
import { EdgeExtensionsDownloadsCounter } from "../services/projects/download-counters/edge-extensions-downloads-counter";
import { GnomeExtensionsDownloadsCounter } from "../services/projects/download-counters/gnome-extensions-downloads-counter";
import { NpmDownloadsCounter } from "../services/projects/download-counters/npm-downloads-counter";

export interface ProjectDefinition {
  githubName: string;
  downloadCounters?: (() => DownloadsCounter)[];
}

export const projectDefinitions: ProjectDefinition[] = [
  {
    githubName: 'gnome-quicksetings-audio-devices-hider-extension',
    downloadCounters: [() => new GnomeExtensionsDownloadsCounter(
      'https://extensions.gnome.org/extension/5964/quick-settings-audio-devices-hider/')
    ]
  },
  {
    githubName: 'gnome-quicksettings-audio-devices-renamer-extension',
    downloadCounters: [() => new GnomeExtensionsDownloadsCounter(
      'https://extensions.gnome.org/extension/6000/quick-settings-audio-devices-renamer')
    ]
  },
  {
    githubName: 'technology-notebook'
  },
  {
    githubName: 'gnome-dim-completed-calendar-events-extension',
    downloadCounters: [
      () => new GnomeExtensionsDownloadsCounter(
        'https://extensions.gnome.org/extension/5979/dim-completed-calendar-events/')
    ]
  },
  {
    githubName: 'gnome-do-not-disturb-while-screen-sharing-or-recording-extension',
    downloadCounters: [
      () => new GnomeExtensionsDownloadsCounter(
        'https://extensions.gnome.org/extension/5985/do-not-disturb-while-screen-sharing-or-recording/')
    ]
  },
  {
    githubName: 'gnome-do-not-disturb-while-screen-sharing-or-recording-extension',
    downloadCounters: [
      () => new GnomeExtensionsDownloadsCounter(
        'https://extensions.gnome.org/extension/5985/do-not-disturb-while-screen-sharing-or-recording/')
    ]
  },
  {
    githubName: 'vuepress-plugin-feedback-panel',
    downloadCounters: [
      () => new NpmDownloadsCounter('vuepress-plugin-feedback-panel')
    ]
  },
  {
    githubName: 'LodzkieReservationChecker'
  },
  {
    githubName: 'puff',
    downloadCounters: [
      () => new CratesIoDownloadsCounter('puff')
    ]
  },
  {
    githubName: 'azure-webapp-locker'
  },
  {
    githubName: 'mj-iot'
  },
  {
    githubName: 'Hack.JackCompiler'
  },
  {
    githubName: 'Hack.JackPrograms'
  },
  {
    githubName: 'Hack.VMTranslator'
  },
  {
    githubName: 'Hack.Assembler'
  },
  {
    githubName: 'azure-config-converter'
  },
  {
    githubName: 'alpha-img.webapi-dotnet'
  },
  {
    githubName: 'alpha-img.spa-vue'
  },
  {
    githubName: 'air-quality-sensor'
  },
  {
    githubName: 'open-multiple-links-browser-extension',
    downloadCounters: [
      () => new ChromeExtensionsDownloadsCounter(
        'aihgofmdijjhegajmdomlafeiklofndl'),
      () => new EdgeExtensionsDownloadsCounter(
        'edibnioojbnicoocokdokbmgblbnnbpe'),
    ]
  }
];