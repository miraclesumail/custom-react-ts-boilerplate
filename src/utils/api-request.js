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
exports.handleResponseType = void 0;
/**
 * Handles response according to content type
 * @param {object} response
 * @returns {promise}
 */
function handleResponseType(response) {
    if (response.headers) {
        var contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/pdf")) {
            return Promise.all([response.ok, response.blob()]);
        }
        if (contentType && contentType.includes("application/json")) {
            return Promise.all([response.ok, response.json()]);
        }
        // it includes all text types
        if (contentType && contentType.includes("text/")) {
            return Promise.all([response.ok, response.text()]);
        }
        // unfortunately on download files there is no header available
        if (response.url && response.url.endsWith(".tgz") === true) {
            return Promise.all([response.ok, response.blob()]);
        }
    }
    return Promise.all([response.ok, response.text()]);
}
exports.handleResponseType = handleResponseType;
var API = /** @class */ (function () {
    function API() {
    }
    API.prototype.request = function (url, method, options) {
        if (method === void 0) { method = "GET"; }
        if (options === void 0) { options = { headers: {} }; }
        var token = localStorage.getItem("token");
        var headers = new Headers(options.headers);
        if (method === "post") {
            headers.set("content-type", "application/json");
        }
        if (token) {
            headers.set("x-access-token", token);
            options.headers = headers;
        }
        return new Promise(function (resolve, reject) {
            fetch(url, __assign({ method: method }, options))
                .then(handleResponseType)
                .then(function (response) {
                if (response[0]) {
                    resolve(response[1]);
                }
                else {
                    reject(new Error("something went wrong"));
                }
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    return API;
}());
exports.default = new API();
