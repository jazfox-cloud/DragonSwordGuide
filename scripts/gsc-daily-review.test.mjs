import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const adapter = resolve(projectRoot, "scripts/gsc-daily-review.mjs");
let fakeAios;

before(async () => {
  fakeAios = await mkdtemp(resolve(tmpdir(), "dragon-gsc-adapter-test-"));
  await mkdir(resolve(fakeAios, "scripts"));
  await writeFile(resolve(fakeAios, "package.json"), JSON.stringify({
    private: true,
    type: "module",
    scripts: {
      "gsc:fresh-data": "node scripts/fake-gsc-fresh-data.mjs",
    },
  }));
  await writeFile(
    resolve(fakeAios, "scripts/fake-gsc-fresh-data.mjs"),
    "if (process.env.FAKE_GSC_EXIT_CODE) { process.stderr.write('governed failure\\n'); process.exitCode = Number(process.env.FAKE_GSC_EXIT_CODE); } else { process.stdout.write(JSON.stringify({ args: process.argv.slice(2) }) + '\\n'); }\n",
  );
});

after(async () => {
  await rm(fakeAios, { recursive: true, force: true });
});

test("forwards only DragonSword property and dates to the governed AIOS command", async () => {
  const { stdout, stderr } = await run(process.execPath, [
    adapter,
    "--start-date",
    "2026-08-10",
    "--end-date",
    "2026-08-20",
  ], {
    cwd: projectRoot,
    env: { ...process.env, AIOS_GSC_REPO: fakeAios },
  });

  assert.equal(stderr, "");
  assert.deepEqual(JSON.parse(stdout), {
    args: [
      "--property",
      "sc-domain:dragonswordguide.com",
      "--start-date",
      "2026-08-10",
      "--end-date",
      "2026-08-20",
    ],
  });
});

test("fails closed when a required date is missing", async () => {
  await assert.rejects(
    run(process.execPath, [adapter, "--start-date", "2026-08-10"], {
      cwd: projectRoot,
      env: { ...process.env, AIOS_GSC_REPO: fakeAios },
    }),
    (error) => error.code === 1 && error.stdout === "" && error.stderr === "GSC daily review failed\n",
  );
});

test("fails closed on unknown adapter arguments", async () => {
  await assert.rejects(
    run(process.execPath, [
      adapter,
      "--start-date",
      "2026-08-10",
      "--end-date",
      "2026-08-20",
      "--data-state",
      "all",
    ], {
      cwd: projectRoot,
      env: { ...process.env, AIOS_GSC_REPO: fakeAios },
    }),
    (error) => error.code === 1 && error.stdout === "" && error.stderr === "GSC daily review failed\n",
  );
});

test("resolves the governed checkout through the primary checkout git common directory", async () => {
  const layout = await mkdtemp(resolve(tmpdir(), "dragon-gsc-layout-test-"));
  try {
    const primaryRoot = resolve(layout, "Documents/ChatGPT/DragonSwordGuide");
    const worktreeRoot = resolve(layout, "worktrees/dragon");
    const governedRoot = resolve(layout, "Documents/aios/governed-gsc-fresh-data");
    await mkdir(resolve(primaryRoot, ".git"), { recursive: true });
    await mkdir(governedRoot, { recursive: true });
    await writeFile(resolve(governedRoot, "package.json"), "{}\n");

    const { resolveAiosRepo } = await import("./gsc-daily-review.mjs");
    assert.equal(await resolveAiosRepo({
      configuredRepo: "",
      projectRoot: worktreeRoot,
      gitCommonDir: resolve(primaryRoot, ".git"),
    }), governedRoot);
  } finally {
    await rm(layout, { recursive: true, force: true });
  }
});

test("propagates the governed command nonzero exit code and stderr", async () => {
  await assert.rejects(
    run(process.execPath, [
      adapter,
      "--start-date",
      "2026-08-10",
      "--end-date",
      "2026-08-20",
    ], {
      cwd: projectRoot,
      env: { ...process.env, AIOS_GSC_REPO: fakeAios, FAKE_GSC_EXIT_CODE: "7" },
    }),
    (error) => error.code === 7 && error.stdout === "" && error.stderr === "governed failure\n",
  );
});
