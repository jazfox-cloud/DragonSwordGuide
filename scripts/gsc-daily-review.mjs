#!/usr/bin/env node
/* global console, process */
import { execFileSync, spawn } from "node:child_process";
import { access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export const resolveAiosRepo = async ({
  configuredRepo = process.env.AIOS_GSC_REPO,
  projectRoot: currentRoot = projectRoot,
  gitCommonDir,
} = {}) => {
  if (configuredRepo) {
    await access(resolve(configuredRepo, "package.json"));
    return configuredRepo;
  }

  const candidates = [resolve(currentRoot, "../../aios/governed-gsc-fresh-data")];
  const commonDir = gitCommonDir ?? execFileSync(
    "git",
    ["rev-parse", "--git-common-dir"],
    { cwd: currentRoot, encoding: "utf8" },
  ).trim();
  const primaryRoot = dirname(resolve(currentRoot, commonDir));
  candidates.push(resolve(primaryRoot, "../../aios/governed-gsc-fresh-data"));

  for (const candidate of new Set(candidates)) {
    try {
      await access(resolve(candidate, "package.json"));
      return candidate;
    } catch {
      // Try the next deterministic governed-checkout location.
    }
  }
  throw new Error("Governed AIOS checkout not found");
};

const parseArgs = (argv) => {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 2) {
    const option = argv[index];
    const value = argv[index + 1];
    if (option !== "--start-date" && option !== "--end-date") {
      throw new Error("Unknown argument");
    }
    if (!value || value.startsWith("--")) throw new Error("Missing argument value");
    parsed[option === "--start-date" ? "startDate" : "endDate"] = value;
  }
  if (!parsed.startDate || !parsed.endDate) throw new Error("Both dates are required");
  return parsed;
};

const run = async (argv) => {
  const { startDate, endDate } = parseArgs(argv);
  const aiosRepo = await resolveAiosRepo();

  const child = spawn("npm", [
    "run",
    "-s",
    "gsc:fresh-data",
    "--",
    "--property",
    "sc-domain:dragonswordguide.com",
    "--start-date",
    startDate,
    "--end-date",
    endDate,
  ], {
    cwd: aiosRepo,
    env: process.env,
    stdio: ["inherit", "pipe", "inherit"],
  });
  child.stdout.pipe(process.stdout);
  return new Promise((resolveExit, reject) => {
    child.once("error", reject);
    child.once("close", (code) => resolveExit(code ?? 1));
  });
};

const main = async () => {
  try {
    const exitCode = await run(process.argv.slice(2));
    if (exitCode !== 0) process.exitCode = exitCode;
  } catch {
    console.error("GSC daily review failed");
    process.exitCode = 1;
  }
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
