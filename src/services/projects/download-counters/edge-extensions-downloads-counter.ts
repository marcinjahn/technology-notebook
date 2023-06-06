import type { DownloadsCounterResult, DownloadsCounter } from "./downloads-counter";

export class EdgeExtensionsDownloadsCounter implements DownloadsCounter {
  constructor(private edgeAddonsLink: string) {}

  async getCount(): Promise<DownloadsCounterResult> {
    return new Promise(resolve => resolve({
      downloads: 0,
      source: 'Edge Addons'
    }));
  }
}