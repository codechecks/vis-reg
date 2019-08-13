import { codechecks } from "@codechecks/client";
import { visReg } from "./vis-reg";
import { UserProvidedOptions, parseOptions } from "./options";

export const ARTIFACT_KEY = "vis-reg";

export async function visRegCodecheck(_options: UserProvidedOptions = {}): Promise<void> {
  const options = parseOptions(_options, codechecks.context.workspaceRoot);

  await codechecks.saveDirectory(options.artifactName, options.imagesPath);

  if (!codechecks.isPr()) {
    return;
  }

  const reportData = await visReg({
    getBaseImages: path => codechecks.getDirectory(options.artifactName, path),
    headPath: options.imagesPath,
  });

  const reportArtifact = `${options.artifactName}/report`;
  await codechecks.saveDirectory(reportArtifact, reportData.reportPath);

  await codechecks.success({
    name: `Visual regression (${options.collectionName})`,
    shortDescription: `Changed: ${reportData.failedItems.length}, New: ${reportData.newItems.length}, Deleted: ${reportData.deletedItems.length}`,
    detailsUrl: codechecks.getArtifactLink(`${reportArtifact}/index.html`),
  });
}

export default visRegCodecheck;
