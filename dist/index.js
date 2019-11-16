module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(163);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 88:
/***/ (function() {

eval("require")("@actions/core");


/***/ }),

/***/ 121:
/***/ (function() {

eval("require")("@actions/io");


/***/ }),

/***/ 163:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const fs = __webpack_require__(747);
const core = __webpack_require__(88);
const tc = __webpack_require__(251);
const io = __webpack_require__(121);
const exec = __webpack_require__(919);

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
      await tc.cacheFile(dmenvBinPath);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()


/***/ }),

/***/ 251:
/***/ (function() {

eval("require")("@actions/tool-cache");


/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 919:
/***/ (function() {

eval("require")("@actions/exec");


/***/ })

/******/ });