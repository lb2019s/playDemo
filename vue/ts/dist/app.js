/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (() => {

eval("\nvar msg = 'Typescript';\nfunction sayHello(msg) {\n    return 'hello ' + msg;\n}\ndocument.body.textContent = sayHello(msg);\nfunction area(s) {\n    if (s.kind === 'square') {\n        return s.size * s.size;\n    }\n    else if (s.kind === 'rectangle') {\n        return s.width * s.height;\n    }\n    else if (s.kind === 'circle') {\n        return s.radius * s.radius;\n    }\n    else {\n        return s;\n    }\n}\narea({\n    kind: 'circle',\n    radius: 4\n});\n\n\n//# sourceURL=webpack://ts/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;