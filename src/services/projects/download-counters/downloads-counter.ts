export interface DownloadsCounter {
  getCount: () => Promise<DownloadsCounterResult>;
}

export interface DownloadsCounterResult {
  downloads: number;
  source: string;
  hasError?: boolean;
}

