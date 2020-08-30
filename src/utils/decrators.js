"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = exports.Decrator1 = void 0;
var react_1 = __importStar(require("react"));
function Decrator1(msg) {
    return function (Cmp) {
        return /** @class */ (function (_super) {
            __extends(Test, _super);
            function Test() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Test.prototype.componentDidMount = function () {
                console.log("componentDidMount", msg);
            };
            Test.prototype.render = function () {
                return react_1.default.createElement(Cmp, __assign({}, this.props));
            };
            return Test;
        }(react_1.Component));
    };
}
exports.Decrator1 = Decrator1;
function debounce(time) {
    return function (target, property, descriptor) {
        var func = descriptor.value;
        var timer = null;
        descriptor.value = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log(target, "property");
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                console.log(_this, "what is this");
                func.apply(_this, args);
            }, time);
        };
        return descriptor;
    };
}
exports.debounce = debounce;
var eventsMap;
(function (eventsMap) {
    eventsMap[eventsMap["create"] = 0] = "create";
    eventsMap[eventsMap["destroy"] = 1] = "destroy";
})(eventsMap || (eventsMap = {}));
function reportEvent(event) {
    return function (target, property, descriptor) {
        var func = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (eventsMap[event]) {
                this.props.dispatch({
                    type: event,
                    payload: {
                        name: localStorage.getItem("name"),
                        time: Date.now()
                    }
                });
            }
            func.apply(this.args);
        };
        return descriptor;
    };
}
