import * as cheerio from 'cheerio';
import type { DownloadsCounterResult, DownloadsCounter } from "./downloads-counter";

export class GnomeExtensionsDownloadsCounter implements DownloadsCounter {
  constructor(private egoLink: string) {}

  async getCount(): Promise<DownloadsCounterResult> {
    const response = await fetch(this.egoLink);

    if (!response.ok) {
      throw new Error(`Gnome Extensions downloads counter failed for ${this.egoLink}. Error code: ${response.status}`);
    }

    return await response.text().then(text => {
      const $ = cheerio.load(text);
      const downloads = $('.downloads').prop('innerHTML');

      if (!downloads) {
        throw new Error('Could not find the HTML node representing downloads on Gnome Extensions website');
      }

      const downloadsNumber = parseInt(downloads.replace(' downloads', ''));

      return {
        downloads: downloadsNumber,
        source: this.egoLink
      };
    })
  }
}