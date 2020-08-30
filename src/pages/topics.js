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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var antd_mobile_1 = require("antd-mobile");
var core_decorators_1 = require("core-decorators");
var decrators_1 = require("@src/utils/decrators");
require("../css/topic.css");
var componentName = /** @class */ (function (_super) {
    __extends(componentName, _super);
    function componentName() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            docked: false
        };
        _this.onDock = function (d) {
            var _a;
            _this.setState((_a = {},
                _a[d] = !_this.state[d],
                _a));
        };
        return _this;
    }
    componentName.prototype.onClick = function () {
        console.log("you clicked this");
    };
    componentName.prototype.render = function () {
        var _this = this;
        var sidebar = (react_1.default.createElement(antd_mobile_1.List, null, [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15
        ].map(function (i, index) {
            if (index === 0) {
                return (react_1.default.createElement(antd_mobile_1.List.Item, { key: index, thumb: "https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png", multipleLine: true }, "Category"));
            }
            return (react_1.default.createElement(antd_mobile_1.List.Item, { key: index, thumb: "https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png" },
                "Category",
                index));
        })));
        return (react_1.default.createElement("div", { style: { height: "100%" } },
            react_1.default.createElement(antd_mobile_1.NavBar, { icon: react_1.default.createElement(antd_mobile_1.Icon, { type: "ellipsis" }), onLeftClick: function () { return _this.onDock("docked"); } }, "Docked in document"),
            react_1.default.createElement(antd_mobile_1.Drawer, { className: "my-drawer", style: { minHeight: document.documentElement.clientHeight }, contentStyle: {
                    color: "#A6A6A6",
                    textAlign: "center",
                    paddingTop: 42
                }, sidebarStyle: { border: "1px solid #ddd" }, sidebar: sidebar, docked: this.state.docked },
                react_1.default.createElement("div", { onClick: this.onClick }, " Click upper-left corner"))));
    };
    __decorate([
        core_decorators_1.autobind,
        decrators_1.debounce(3000),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], componentName.prototype, "onClick", null);
    componentName = __decorate([
        decrators_1.Decrator1("what")
    ], componentName);
    return componentName;
}(react_1.Component));
exports.default = componentName;
