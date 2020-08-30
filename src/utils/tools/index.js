"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memorize = void 0;
function memorize(fn) {
    var resultMap = new Map();
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (resultMap.has(args)) {
            return resultMap.get(args);
        }
        var result = fn.apply(null, args);
        resultMap.set(args, result);
        return result;
    };
}
exports.memorize = memorize;
