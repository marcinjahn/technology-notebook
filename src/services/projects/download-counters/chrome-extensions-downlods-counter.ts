import * as cheerio from 'cheerio';
import type { DownloadsCounterResult, DownloadsCounter } from "./downloads-counter";

export class ChromeExtensionsDownloadsCounter implements DownloadsCounter {
  constructor(private extensionId: string) {}

  async getCount(): Promise<DownloadsCounterResult> {
    const response = await fetch(`https://chrome-stats.com/d/${this.extensionId}`);

    if (!response.ok) {
      throw new Error(`Google Chrome downloads counter failed for ${this.extensionId}. Error code: ${response.status}`);
    }

    return await response.text().then(text => {
      const $ = cheerio.load(text);

      const extractedText = $(`.left-panel a[href="/d/${this.extensionId}/trends"]`).first().text().trim().replaceAll(',', '');

      if (!extractedText) {
        throw new Error('Could not find the HTML node representing active users on Chrome Web Store');
      }

      const downloadsNumber = parseInt(extractedText);

      return {
        downloads: downloadsNumber,
        source: "Weekly active users on Chrome Web Store"
      };
    });
  }
}