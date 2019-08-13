import { dir as tmpDir } from "tmp-promise";
import * as execa from "execa";

import * as fse from "fs-extra";
import { join as j } from "path";
import { debugLog } from "./debug";

interface VisRegOptions {
  getBaseImages: (path: string) => Promise<void>;
  headPath: string;
}

export interface VisRegOutput {
  failedItems: string[];
  newItems: string[];
  deletedItems: string[];
  reportPath: string;
}

export async function visReg(visRegOptions: VisRegOptions): Promise<VisRegOutput> {
  const { path: tmpPathDir } = await tmpDir();
  debugLog({ tmpPathDir });
  await fse.ensureDir(j(tmpPathDir, ".reg"));

  await visRegOptions.getBaseImages(j(tmpPathDir, ".reg/expected"));
  await fse.copy(visRegOptions.headPath, j(tmpPathDir, "__screenshots__"));

  await fse.copy(j(__dirname, "../static/regconfig.json"), j(tmpPathDir, "regconfig.json"));

  await execa(
    `${require.resolve("reg-suit/lib/cli.js")}`,
    ["compare", "-c", j(tmpPathDir, "regconfig.json")],
    {
      timeout: 100000,
      cwd: tmpPathDir,
    },
  );

  const reportRaw = require(j(tmpPathDir, ".reg/out.json"));

  return {
    failedItems: reportRaw.failedItems,
    newItems: reportRaw.newItems,
    deletedItems: reportRaw.deletedItems,
    reportPath: j(tmpPathDir, ".reg"),
  };
}
