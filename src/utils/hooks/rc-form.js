"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useForm(stateSchema, validationSchema, callback) {
    if (validationSchema === void 0) { validationSchema = {}; }
    var _a = react_1.useState(stateSchema), state = _a[0], setState = _a[1];
    var _b = react_1.useState(true), disable = _b[0], setDisable = _b[1];
    var _c = react_1.useState(false), isDirty = _c[0], setIsDirty = _c[1];
    react_1.useEffect(function () {
        if (isDirty) {
            setDisable(validateState());
        }
    }, [state, isDirty]);
    // 注意这里里面的校验是依赖state的  所以每次state更新时要重新创建才行
    var validateState = react_1.useCallback(function () {
        var hasErrorInState = Object.keys(validationSchema).some(function (key) {
            var isInputFieldRequired = validationSchema[key].required;
            var stateValue = state[key].value; // state value
            var stateError = state[key].error; // state error
            return (isInputFieldRequired && !stateValue) || stateError;
        });
        return hasErrorInState;
    }, [state, validationSchema]);
    var handleOnChange = react_1.useCallback(function (event) {
        setIsDirty(true);
        var name = event.target.name;
        var value = event.target.value;
        var error = "";
        if (validationSchema[name].required) {
            if (!value) {
                error = "This is required field.";
            }
        }
        if (validationSchema[name].validator !== null &&
            typeof validationSchema[name].validator === "object") {
            if (value && !validationSchema[name].validator.regEx.test(value)) {
                error = validationSchema[name].validator.error;
            }
        }
        setState(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[name] = { value: value, error: error }, _a)));
        });
    }, [validationSchema]);
    // 验证通过提交
    var handleOnSubmit = react_1.useCallback(function (event) {
        event.preventDefault();
        if (!disable) {
            callback(state);
        }
    }, [state]);
    return { state: state, disable: disable, handleOnChange: handleOnChange, handleOnSubmit: handleOnSubmit };
}
exports.default = useForm;
