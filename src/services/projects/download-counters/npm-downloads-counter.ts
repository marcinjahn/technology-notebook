import type { DownloadsCounterResult, DownloadsCounter } from "./downloads-counter";

export class NpmDownloadsCounter implements DownloadsCounter {
  constructor(private packageName: string) {}

  async getCount(): Promise<DownloadsCounterResult> {
    const response = await fetch(`https://api.npmjs.org/downloads/point/2000-01-01:${getNow()}/${this.packageName}`)
    
    if (!response.ok) {
      throw new Error(`npm downloads counter failed for package ${this.packageName}. Error code: ${response.status}`);
    }

    return await response.json().then(json => ({
      downloads: json.downloads as number,
      source: 'NPM'
    }))
  }
}

function getNow(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript months are 0-11
  const day = date.getDate();

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}