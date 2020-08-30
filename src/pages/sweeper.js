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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("../css/sweeper.css");
var mine_1 = __importDefault(require("@src/components/mine"));
var tools_1 = require("@src/utils/tools");
var bombsAmount = 20;
function makeArr(index, gap) {
    var arr = [];
    arr.push.apply(arr, [index + 1, index - 1]);
    arr.push.apply(arr, [index + 1 + gap, index - 1 + gap]);
    arr.push.apply(arr, [index + 1 - gap, index - 1 - gap]);
    arr.push.apply(arr, [index - gap, index + gap]);
    return arr;
}
function generateData(total, bombs) {
    var bombsArr = Array.from({ length: bombs }, function () { return 1; });
    var normalArr = Array.from({ length: total - bombs }, function () { return 0; });
    var arr = bombsArr.concat(normalArr).sort(function () { return Math.random() - 0.5; });
    return arr;
}
function getStaticCount(index) {
    var x = index % 10;
    var y = Math.floor(index / 10);
    var count = [];
    if (x - 1 >= 0 && x + 1 <= 9) {
        if (y === 0) {
            count.push.apply(count, [index + 1, index - 1, index + 9, index + 10, index + 11]);
        }
        else if (y === 9) {
            count.push.apply(count, [index + 1, index - 1, index - 9, index - 10, index - 11]);
        }
        else {
            count.push.apply(count, makeArr(index, 10));
        }
    }
    else if (x === 0) {
        if (y === 0) {
            count.push.apply(count, [index + 1, index + 10, index + 11]);
        }
        else if (y === 9) {
            count.push.apply(count, [index + 1, index - 10, index - 9]);
        }
        else {
            count.push.apply(count, [index + 1, index + 10, index + 11, index - 10, index - 9]);
        }
    }
    else {
        if (y === 0) {
            count.push.apply(count, [index - 1, index + 10, index + 9]);
        }
        else if (y === 9) {
            count.push.apply(count, [index - 1, index - 10, index - 11]);
        }
        else {
            count.push.apply(count, [index - 1, index - 10, index + 9, index + 10, index - 11]);
        }
    }
    return count;
}
function getBombCount(index, arr) {
    var countArr = getStaticCount(index);
    console.log("countArr is", countArr);
    var count = 0;
    for (var i = 0; i < countArr.length; i++) {
        if (arr[countArr[i]] !== undefined && arr[countArr[i]]) {
            count++;
        }
    }
    return count;
}
function getFinalData(axisData) {
    //   const axisData = generateData(100, 20);
    var data = [];
    for (var i = 0; i < axisData.length; i++) {
        if (axisData[i]) {
            data[i] = {
                isBomb: true,
                isChecked: false
            };
        }
        else {
            var bombCount = getBombCount(i, axisData);
            data[i] = {
                bombCount: bombCount,
                isChecked: false
            };
        }
    }
    return data;
}
var cacheFn = tools_1.memorize(getStaticCount);
function getRecursiveData(list, index, indexArr) {
    if (indexArr === void 0) { indexArr = []; }
    console.log(index, "indexindexxss");
    var includedArr = cacheFn(index);
    var filteredArr = includedArr.filter(function (item) { return !list[item].isBomb && !list[item].bombCount; });
    console.log(indexArr, index, "kkdkdkdodod ==---");
    if (!filteredArr.length || indexArr.includes(index))
        return indexArr;
    indexArr = __spreadArrays(indexArr, [index]);
    for (var i = 0; i < filteredArr.length; i++) {
        var arr = getRecursiveData(list, filteredArr[i], indexArr);
        indexArr = Array.from(new Set(__spreadArrays(indexArr, arr)));
    }
    return indexArr;
}
var Sweeper = /** @class */ (function (_super) {
    __extends(Sweeper, _super);
    function Sweeper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            list: [],
            axisData: []
        };
        _this.onClick = function (index) {
            var list = _this.state.list.slice();
            if (list[index].isChecked || list[index].isMarked) {
                return;
            }
            list[index].isChecked = true;
            _this.setState({ list: list });
            if (list[index].isBomb) {
                alert("game over");
            }
            else if (!list[index].bombCount) {
                var chooseIndexArr = getRecursiveData(list, index);
                var checkedArrs = Array.from(new Set(chooseIndexArr.reduce(function (prev, next) {
                    var data = prev.concat(cacheFn(next));
                    return data;
                }, []))).forEach(function (i) {
                    list[i].isChecked = true;
                });
                _this.setState({ list: list });
            }
        };
        _this.onMark = function (index) {
            var list = _this.state.list.slice();
            list[index].isMarked = !list[index].isMarked;
            _this.setState({ list: list });
        };
        return _this;
    }
    Sweeper.prototype.componentDidMount = function () {
        // const axisData = generateData(100, 20);
        // console.log("axisData is", axisData);
        // console.log(getBombCount(0, axisData));
        var axisData = generateData(100, 20);
        var list = getFinalData(axisData);
        console.log(list);
        this.setState({ list: list });
    };
    Sweeper.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement("div", { className: "grid" }, this.state.list.map(function (item, index) { return (react_1.default.createElement(mine_1.default, __assign({ key: index }, item, { handleClick: function () { return _this.onClick(index); }, onMark: function (e) {
                e.preventDefault();
                _this.onMark(index);
            } }))); })));
    };
    return Sweeper;
}(react_1.Component));
exports.default = Sweeper;
