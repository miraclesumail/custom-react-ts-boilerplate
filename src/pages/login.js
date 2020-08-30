"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var rc_form_1 = __importDefault(require("@src/utils/hooks/rc-form"));
var api_request_1 = __importDefault(require("@src/utils/api-request"));
var stateSchema = {
    name: { value: "", error: "" },
    password: { value: "", error: "" }
};
var validationStateSchema = {
    name: {
        required: true,
        validator: {
            regEx: /^[a-zA-Z]+$/,
            error: "Invalid name format."
        }
    },
    password: {
        required: true,
        validator: {
            regEx: /^[a-zA-Z]+$/,
            error: "Invalid password format."
        }
    }
};
exports.default = (function () {
    var history = react_router_dom_1.useHistory();
    var _a = rc_form_1.default(stateSchema, validationStateSchema, function (state) {
        api_request_1.default
            .request("/login", "post", {
            body: JSON.stringify({
                name: state.name.value,
                password: state.password.value
            })
        })
            .then(function (res) {
            console.log(res);
            localStorage.setItem("token", res.token);
        });
    }), state = _a.state, handleOnChange = _a.handleOnChange, handleOnSubmit = _a.handleOnSubmit, disable = _a.disable;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("form", { onSubmit: handleOnSubmit },
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", { htmlFor: "name" },
                    "name:",
                    react_1.default.createElement("input", { type: "text", name: "name", value: state.name.value, onChange: handleOnChange })),
                state.name.error && (react_1.default.createElement("p", { style: { color: "red" } }, state.name.error))),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", { htmlFor: "password" },
                    "password:",
                    react_1.default.createElement("input", { type: "text", name: "password", value: state.password.value, onChange: handleOnChange })),
                state.password.error && (react_1.default.createElement("p", { style: { color: "red" } }, state.password.error))),
            react_1.default.createElement("input", { type: "submit", value: "\u63D0\u4EA4" }))));
});
