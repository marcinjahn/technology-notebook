import { CratesIoDownloadsCounter } from "../services/projects/download-counters/crates-io-downloads-counter";
import { ChromeExtensionsDownloadsCounter } from "../services/projects/download-counters/chrome-extensions-downlods-counter";
import type { DownloadsCounter } from "../services/projects/download-counters/downloads-counter";
import { EdgeExtensionsDownloadsCounter } from "../services/projects/download-counters/edge-extensions-downloads-counter";
import { GnomeExtensionsDownloadsCounter } from "../services/projects/download-counters/gnome-extensions-downloads-counter";
import { NpmDownloadsCounter } from "../services/projects/download-counters/npm-downloads-counter";

export interface ProjectDefinition {
  githubName: string;

  /**
   * Optional display name that will be used on the website instead
   * of githubName
   */
  displayName?: string;
  downloadCounters?: (() => DownloadsCounter)[];
}

export const projectDefinitions: ProjectDefinition[] = [
  {
    displayName: 'Quick Settings Audio Devices Hider (Gnome Shell Extension)',
    githubName: 'gnome-quicksetings-audio-devices-hider-extension',
    downloadCounters: [() => new GnomeExtensionsDownloadsCounter(
      'https://extensions.gnome.org/extension/5964/quick-settings-audio-devices-hider/')
    ]
  },
  {
    displayName: 'Quick Settings Audio Devices Renamer (Gnome Shell Extension)',
    githubName: 'gnome-quicksettings-audio-devices-renamer-extension',
    downloadCounters: [() => new GnomeExtensionsDownloadsCounter(
      'https://extensions.gnome.org/extension/6000/quick-settings-audio-devices-renamer')
    ]
  },
  {
    displayName: 'Dev Notebook',
    githubName: 'technology-notebook'
  },
  {
    displayName: 'Dim Completed Calendar Events (Gnome Shell Extension)',
    githubName: 'gnome-dim-completed-calendar-events-extension',
    downloadCounters: [
      () => new GnomeExtensionsDownloadsCounter(
        'https://extensions.gnome.org/extension/5979/dim-completed-calendar-events/')
    ]
  },
  {
    displayName: 'Do Not Disturb While Sreeen Sharing Or Recording (Gnome Shell Extension)',
    githubName: 'gnome-do-not-disturb-while-screen-sharing-or-recording-extension',
    downloadCounters: [
      () => new GnomeExtensionsDownloadsCounter(
        'https://extensions.gnome.org/extension/5985/do-not-disturb-while-screen-sharing-or-recording/')
    ]
  },
  {
    displayName: 'VuePress Plugin Feedback Panel',
    githubName: 'vuepress-plugin-feedback-panel',
    downloadCounters: [
      () => new NpmDownloadsCounter('vuepress-plugin-feedback-panel')
    ]
  },
  {
    displayName: 'Lodzkie Reservation Checker',
    githubName: 'LodzkieReservationChecker'
  },
  {
    githubName: 'puff',
    downloadCounters: [
      () => new CratesIoDownloadsCounter('puff')
    ]
  },
  {
    displayName: 'Azure Web App Locker',
    githubName: 'azure-webapp-locker'
  },
  {
    displayName: 'MJ IoT',
    githubName: 'mj-iot'
  },
  {
    displayName: 'Hack Platform Jack Compiler',
    githubName: 'Hack.JackCompiler'
  },
  {
    displayName: 'Hack Platform Jack Program Samples',
    githubName: 'Hack.JackPrograms'
  },
  {
    displayName: 'Hack Platform VM Translator',
    githubName: 'Hack.VMTranslator'
  },
  {
    displayName: 'Hack Platform Assembler',
    githubName: 'Hack.Assembler'
  },
  {
    displayName: 'Azure Config Converter',
    githubName: 'azure-config-converter'
  },
  {
    displayName: 'Alpha Img (.NET Web API)',
    githubName: 'alpha-img.webapi-dotnet'
  },
  {
    displayName: 'Alpha Img (Vue Frontend)',
    githubName: 'alpha-img.spa-vue'
  },
  {
    displayName: 'Air Quality Sensor (AVR)',
    githubName: 'air-quality-sensor'
  },
  {
    displayName: 'Open Multiple Links (Browser Extension)',
    githubName: 'open-multiple-links-browser-extension',
    downloadCounters: [
      () => new ChromeExtensionsDownloadsCounter(
        'aihgofmdijjhegajmdomlafeiklofndl'),
      () => new EdgeExtensionsDownloadsCounter(
        'edibnioojbnicoocokdokbmgblbnnbpe'),
    ]
  }
];