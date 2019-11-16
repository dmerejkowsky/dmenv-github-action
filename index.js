const core = require('@actions/core');


try {
  const dmenvVersion = core.getInput("dmenv-version");
  console.log(`Installing dmenv version ${dmenvVersion}`);
} catch (error) {
  core.setFailed(error.message);
}
