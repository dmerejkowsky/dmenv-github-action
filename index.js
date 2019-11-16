const fs = require('fs');
const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const io = require('@actions/io');
const exec = require('@actions/exec');

async function run() {
  try {
    const dmenvVersion = core.getInput("dmenv-version");
    console.log(`Installing dmenv version ${dmenvVersion}`);
    // Todo: darwin, win32
    if (process.platform === 'linux') {
      const dmenvDlPath = await tc.downloadTool(`https://github.com/TankerHQ/dmenv/releases/download/v${dmenvVersion}/dmenv-linux`);
      const binariesPath = `${process.env.HOME}/.local/bin`;
      core.addPath(binariesPath);
      await io.mkdirP(binariesPath);
      const dmenvBinPath = `${binariesPath}/dmenv'`;
      console.log(`cp ${dmenvDlPath} -> ${dmenvBinPath}`);
      await io.cp(dmenvDlPath, dmenvBinPath);
      await fs.chmod(dmenvBinPath, 0o775, (err) => {
        if (err) {
          throw err;
        }
      });
      await exec.exec(dmenvBinPath, ["--version"]);
      await tc.cacheFile(dmenvBinPath, 'dmenv', 'dmenv', dmenvVersion);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
