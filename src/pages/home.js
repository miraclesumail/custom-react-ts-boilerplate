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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var animate_component_1 = __importDefault(require("@src/components/animate-component"));
require("@src/css/home.css");
var Test = function (_a) {
    var forwardRef = _a.forwardRef;
    return react_1.default.createElement("div", { ref: forwardRef, className: "block" });
};
var Danc = react_1.default.forwardRef(function (props, forwardRef) { return (react_1.default.createElement(Test, __assign({}, props, { forwardRef: forwardRef }))); });
var animateOptions = {
    keyframes: [
        { translateY: -40 },
        { translateX: 250 },
        { translateY: 40 },
        { translateX: 0 },
        { translateY: 0 }
    ],
    duration: 4000,
    easing: "easeOutElastic(1, .8)",
    loop: true
};
var Ele = animate_component_1.default(
// {
//   translateX: 250,
//   width: {
//     value: "*=1.5"
//   },
//   delay: 1000,
//   rotate: "1turn",
//   direction: "alternate",
//   duration: 2000
// },
animateOptions, Danc);
var FancyButton = /** @class */ (function (_super) {
    __extends(FancyButton, _super);
    function FancyButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = react_1.default.createRef();
        return _this;
        // ...
    }
    FancyButton.prototype.componentDidMount = function () {
        console.log(this.props, "axiab");
    };
    FancyButton.prototype.render = function () {
        return react_1.default.createElement(Ele, { ref: this.ref });
    };
    return FancyButton;
}(react_1.default.Component));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.popupRef = react_1.default.createRef();
        return _this;
    }
    App.prototype.componentDidMount = function () {
        console.log("this is popupRef", this.popupRef.current);
    };
    App.prototype.render = function () {
        return react_1.default.createElement(Ele, { ref: this.popupRef });
    };
    return App;
}(react_1.default.Component));
exports.default = App;
/*export default () => {
  return (
    <div>
      homelkjlll
      <Ele />
    </div>
  );
};*/
