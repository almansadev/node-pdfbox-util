"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64tostring = exports.stingtobase64 = void 0;
const stingtobase64 = (str) => {
    return Buffer.from(str).toString('base64');
};
exports.stingtobase64 = stingtobase64;
const base64tostring = (str) => {
    return Buffer.from(str, 'base64').toString('utf8');
};
exports.base64tostring = base64tostring;
