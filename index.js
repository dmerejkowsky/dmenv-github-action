const fs = require('fs')
const core = require('@actions/core')
const tc = require('@actions/tool-cache')
const io = require('@actions/io')
const exec = require('@actions/exec')

async function installLinux (version) {
  const dmenvDlPath = await tc.downloadTool(`https://github.com/TankerHQ/dmenv/releases/download/v${version}/dmenv-linux`)
  await installToLocalBin(dmenvDlPath)

  // Don't trust debian-based distros with Python packaging
  //   - install pip with get-pip.py instead of the debian python3-pip package
  //   - install virtualenv with python3 -m pip instead of the python3-venv or python3-virtualenv debian package
  //   - tell dmenv to *not* use `python -m venv` when creating virtual environments
  const getPipPath = await tc.downloadTool('https://bootstrap.pypa.io/get-pip.py')
  await exec.exec('python', [getPipPath, '--user'])
  await exec.exec('python', ['-m', 'pip', 'install', 'virtualenv', '--user'])
  core.exportVariable('DMENV_NO_VENV_STDLIB', '1')
}

async function installDarwin (version) {
  const dmenvDlPath = await tc.downloadTool(`https://github.com/TankerHQ/dmenv/releases/download/v${version}/dmenv-osx`)
  installToLocalBin(dmenvDlPath)
}

async function installWindows (version) {
  const dmenvDlPath = await tc.downloadTool(`https://github.com/TankerHQ/dmenv/releases/download/v${version}/dmenv-windows.exe`)

  const installPath = 'c:\\dmenv'
  await io.mkdirP('c:\\dmenv')
  await io.cp(dmenvDlPath, `${installPath}\\dmenv.exe`)

  core.addPath(installPath)
}

async function installToLocalBin (dlPath) {
  const binariesPath = `${process.env.HOME}/.local/bin`
  await io.mkdirP(binariesPath)
  const dmenvBinPath = `${binariesPath}/dmenv`
  await io.cp(dlPath, dmenvBinPath)
  await fs.chmod(dmenvBinPath, 0o775, (err) => {
    if (err) {
      throw err
    }
  })
  core.addPath(binariesPath)
}

const installs = {
  linux: installLinux,
  darwin: installDarwin,
  win32: installWindows
}

async function installDmenv () {
  const dmenvVersion = core.getInput('dmenv-version')
  console.log(`Installing dmenv version ${dmenvVersion}`)
  await installs[process.platform]()
}

async function run () {
  try {
    installDmenv()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
