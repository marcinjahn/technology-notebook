import type { ProjectDefinition } from "../../static/projects";
import type { DownloadsCounterResult } from "./download-counters/downloads-counter";

export async function executeDownloadCounters(project: ProjectDefinition)
  : Promise<DownloadsCounterResult | null> 
{
  if (!project.downloadCounters) {
    return new Promise((resolve) => resolve(null));
  }

  const countersResults = await Promise.all(
    project.downloadCounters.map(counterFactory => 
      counterFactory().getCount()));

  return countersResults.reduce((acc, result) => ({
    downloads: acc.downloads + result.downloads,
    source: `${acc.source !== INTRO ? acc.source + ';': acc.source} ${result.source}`
  }), {downloads: 0, source: INTRO} as DownloadsCounterResult);
}

const INTRO = "Downloads - data collected from: "