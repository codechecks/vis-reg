import { join } from "path";
import { ARTIFACT_KEY } from ".";

export interface UserProvidedOptions {
  collectionName?: string;
  imagesPath?: string;
}

export interface Options {
  collectionName: string;
  imagesPath: string;
  artifactName: string;
}

export function parseOptions(options: UserProvidedOptions, rootPath: string): Options {
  if (!options.collectionName) {
    throw new Error("Missing collectionName!");
  }

  if (!options.imagesPath) {
    throw new Error("Missing imagesPath!");
  }

  return {
    collectionName: options.collectionName,
    imagesPath: join(rootPath, options.imagesPath),
    artifactName: `${ARTIFACT_KEY}/${options.collectionName}`,
  };
}
