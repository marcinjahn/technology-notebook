import * as cheerio from "cheerio";
import type {
  DownloadsCounterResult,
  DownloadsCounter,
} from "./downloads-counter";

export class EdgeExtensionsDownloadsCounter implements DownloadsCounter {
  constructor(private extensionId: string) {}

  async getCount(): Promise<DownloadsCounterResult> {
    const response = await fetch(
      `https://edge-stats.com/d/${this.extensionId}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        },
      },
    );

    if (!response.ok) {
      console.log(
        `Edge Addons downloads counter failed for ${this.extensionId}. Error code: ${response.status}`,
      );

      return {
        downloads: 0,
        source: "Weekly active users on Edge Addons",
        hasError: true,
      };
    }

    return await response.text().then((text) => {
      const $ = cheerio.load(text);

      const extractedText = $(
        `dt:has(svg path[d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"]) + dd a`,
      )
        .first()
        .text()
        .trim()
        .replaceAll(",", "");

      if (!extractedText) {
        console.log(
          "Could not find the HTML node representing active users on Edge Addons",
        );

        return {
          downloads: 0,
          source: "Weekly active users on Edge Addons",
          hasError: true,
        };
      }

      const downloadsNumber = parseInt(extractedText);

      return {
        downloads: downloadsNumber,
        source: "Weekly active users on Edge Addons",
      };
    });
  }
}
