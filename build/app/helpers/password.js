"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPassword = getPassword;
var crypto_js_1 = __importDefault(require("crypto-js"));
function getPassword(password) {
    var decodedPassword = crypto_js_1.default.enc.Base64.parse(password).toString(crypto_js_1.default.enc.Utf8);
    var encryptedPassword = crypto_js_1.default.MD5(process.env.MD5_API_SALT + decodedPassword).toString();
    return encryptedPassword;
}
