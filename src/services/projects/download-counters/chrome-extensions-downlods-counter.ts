import type { DownloadsCounterResult, DownloadsCounter } from "./downloads-counter";

export class ChromeExtensionsDownloadsCounter implements DownloadsCounter {
  constructor(private egoLink: string) {}

  async getCount(): Promise<DownloadsCounterResult> {
    return new Promise(resolve => resolve({
      downloads: 0,
      source: 'Chrome Web Store'
    }));
  }
}