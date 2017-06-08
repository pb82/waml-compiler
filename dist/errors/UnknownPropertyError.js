"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCompilerError_1 = require("./BaseCompilerError");
class UnknownPropertyError extends BaseCompilerError_1.BaseCompilerError {
    constructor(token, expected) {
        let keys = [];
        for (let key of expected.keys()) {
            keys.push(key.value);
        }
        const valid = keys.join(' or ');
        const expectedString = `. Expected ${valid}`;
        super(`Unknown property '${token.value}'${expectedString}`, token);
    }
}
exports.UnknownPropertyError = UnknownPropertyError;
//# sourceMappingURL=UnknownPropertyError.js.map