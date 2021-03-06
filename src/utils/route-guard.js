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
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var RouteGuard = /** @class */ (function (_super) {
    __extends(RouteGuard, _super);
    function RouteGuard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            Component: null
        };
        _this.isAccessible = function () {
            var needLogin = _this.props.needLogin;
            return !needLogin || localStorage.getItem("token");
        };
        return _this;
    }
    RouteGuard.prototype.componentDidMount = function () {
        var renderer = this.props.renderer;
        if (this.isAccessible()) {
            this.setState({
                Component: renderer
            });
        }
    };
    RouteGuard.prototype.render = function () {
        var needLogin = this.props.needLogin;
        var Component = this.state.Component;
        var forbid = this.isAccessible();
        return !forbid ? (react_1.default.createElement(react_router_dom_1.Redirect, { to: "/login" })) : Component ? (react_1.default.createElement(Component, __assign({}, this.props))) : null;
    };
    return RouteGuard;
}(react_1.Component));
exports.default = RouteGuard;
