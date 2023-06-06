import type { DownloadsCounterResult, DownloadsCounter } from "./downloads-counter";

export class CratesIoDownloadsCounter implements DownloadsCounter {
  constructor(private packageName: string) {}

  async getCount(): Promise<DownloadsCounterResult> {
    const response = await fetch(`https://crates.io/api/v1/crates/${this.packageName}`);

    if(!response.ok) {
      throw new Error(`crates.io downloads counter failed for ${this.packageName}. Error code: ${response.status}`);
    }

    return await response.json().then(json => ({
      downloads: json.crate.downloads as number,
      source: 'crates.io'
    }));
  }
}