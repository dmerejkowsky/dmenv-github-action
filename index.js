const core = require('@actions/core');
const github = require('@actions/github');

async function run()
  try {
    const dmenvVersion = core.getInput("dmenv-version");
    console.log(`Installing dmenv version ${dmenvVersion}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
