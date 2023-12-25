import * as cheerio from 'cheerio';
import type { DownloadsCounterResult, DownloadsCounter } from "./downloads-counter";

export class EdgeExtensionsDownloadsCounter implements DownloadsCounter {
  constructor(private extensionId: string) {}

  async getCount(): Promise<DownloadsCounterResult> {
    const response = await fetch(`https://edge-stats.com/d/${this.extensionId}`);

    if (!response.ok) {
      throw new Error(`Edge Addons downloads counter failed for ${this.extensionId}. Error code: ${response.status}`);
    }

    return await response.text().then(text => {
      const $ = cheerio.load(text);

      const extractedText = $(`.left-panel a[href="/d/${this.extensionId}/trends"]`).first().text().trim().replaceAll(',', '');

      if (!extractedText) {
        throw new Error('Could not find the HTML node representing active users on Edge Addons');
      }

      const downloadsNumber = parseInt(extractedText);

      return {
        downloads: downloadsNumber,
        source: "Weekly active users on Edge Addons"
      };
    });
  }
}