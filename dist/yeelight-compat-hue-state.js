(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("yeelight2"), require("color-convert"));
	else if(typeof define === 'function' && define.amd)
		define(["yeelight2", "color-convert"], factory);
	else if(typeof exports === 'object')
		exports["yeelight-compat-hue"] = factory(require("yeelight2"), require("color-convert"));
	else
		root["yeelight-compat-hue"] = factory(root["yeelight2"], root["color-convert"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.rgbIntToHex = rgbIntToHex;
exports.colorTemperatureToRGB = colorTemperatureToRGB;
exports.hexToRgbInt = hexToRgbInt;
exports.normalize = normalize;
exports.sanitizeState = sanitizeState;

var _colorConvert = __webpack_require__(1);

var _colorConvert2 = _interopRequireDefault(_colorConvert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}

function rgbIntToHex(number) {
    return '#' + (number >>> 0).toString(16).slice(-6).padStart(6, '0');
}

function colorTemperatureToRGB(kelvin) {
    var temp = kelvin / 100;
    var red, green, blue;

    if (temp <= 66) {
        red = 255;
        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;

        if (temp <= 19) {
            blue = 0;
        } else {
            blue = temp - 10;
            blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
        }
    } else {
        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);

        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492);

        blue = 255;
    }

    return {
        r: clamp(red, 0, 255),
        g: clamp(green, 0, 255),
        b: clamp(blue, 0, 255)
    };
}

function clamp(x, min, max) {
    if (x < min) {
        return min;
    }
    if (x > max) {
        return max;
    }

    return x;
}

function hexToRgbInt(hex) {
    return parseInt('0x' + hex.replace('#', ''), 16);
}

function normalize(value) {
    var currentMax = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var newMax = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 255;

    return Math.round(parseInt(value, 10) / currentMax * newMax);
}

function sanitizeState(state) {
    var bright = state.bright,
        power = state.power,
        name = state.name,
        color_mode = state.color_mode;

    var colorModeMap = {
        1: 'rgb',
        2: 'ct',
        3: 'hs'
    };
    var result = {
        state: {
            on: state.power !== 'off',
            bri: normalize(bright),
            colormode: colorModeMap[color_mode]
        },
        name: name,
        raw: state
    };
    if (state.color_mode === '1') {
        var hex = rgbIntToHex(state.rgb);
        result.state = _extends({}, result.state, {
            hex: hex,
            hue: normalize(_colorConvert2.default.hex.hsv(hex)[0], 359, 65535),
            sat: normalize(_colorConvert2.default.hex.hsv(hex)[1])
        });
    } else if (state.color_mode === '2') {
        var _colorTemperatureToRG = colorTemperatureToRGB(state.ct),
            red = _colorTemperatureToRG.r,
            green = _colorTemperatureToRG.g,
            blue = _colorTemperatureToRG.b;

        result.state = _extends({}, result.state, {
            ct: parseInt(state.ct, 10),
            hex: '#' + _colorConvert2.default.rgb.hex(red, green, blue),
            hue: normalize(_colorConvert2.default.rgb.hsv(red, green, blue)[0], 359, 65535),
            sat: normalize(_colorConvert2.default.rgb.hsv(red, green, blue)[1])
        });
    } else if (state.color_mode === '3') {
        var _hex = _colorConvert2.default.hsv.hex(state.hue, state.sat, state.bright);
        result.state = _extends({}, result.state, {
            hex: '#' + _hex,
            hue: normalize(state.hue, 359, 65535),
            sat: normalize(state.sat)
        });
    }
    return result;
}

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _YeeLightNodeState = __webpack_require__(6);

var _YeeLightNodeState2 = _interopRequireDefault(_YeeLightNodeState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (RED) {
    RED.nodes.registerType('yeelight-compat-hue-state', (0, _YeeLightNodeState2.default)(RED));
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = YeeLightNodeState;

var _yeelight = __webpack_require__(0);

var _yeelight2 = _interopRequireDefault(_yeelight);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf

function YeeLightNodeState(RED) {
    return function (config) {
        var node = this;
        var lastSentState = void 0;

        // on, hex, bri, hue, sat, duration
        var onInput = function onInput(msg) {
            node.serverConfig.yeelight.sync().then(function (state) {
                msg.payload = (0, _utils.sanitizeState)(state);
                // only send message if new information or if requested by input
                if (JSON.stringify(msg.payload) !== JSON.stringify(lastSentState) || Object.keys(msg).length > 1) {
                    node.send(msg);
                    lastSentState = msg.payload;
                }
            });
        };

        var onConnected = function onConnected() {
            node.status({ fill: 'green', shape: 'dot', text: 'Connected' });
        };

        var onYeelightError = function onYeelightError() {
            var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            node.status({ fill: 'red', shape: 'ring', text: 'Connection error: ' + error.code });
        };

        var startConnection = function startConnection() {
            node.status({ fill: 'yellow', shape: 'ring', text: 'Connecting...' });
            node.serverConfig.yeelight.on('connect', onConnected);
            node.serverConfig.yeelight.on('error', onYeelightError);
            if (node.serverConfig.yeelight.socketState === 'connected') {
                onConnected();
            }
            if (node.serverConfig.yeelight.socketState === 'error') {
                onYeelightError();
            }
        };

        (function init() {
            RED.nodes.createNode(node, config);
            node.serverConfig = RED.nodes.getNode(config.server);

            if (!node.serverConfig || !node.serverConfig.hostname) {
                node.status({ fill: 'red', shape: 'ring', text: 'Hostname not set' });
                return;
            }
            startConnection();
            node.on('input', onInput);
            node.serverConfig.yeelight.on('props', function (message) {
                if (message.flowing === undefined || Object.keys(message).length > 1) {
                    onInput({});
                }
            });
        })();
    };
}

/***/ })
/******/ ]);
});