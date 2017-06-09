"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCompilerError_1 = require("./BaseCompilerError");
class UnknownBuiltinError extends BaseCompilerError_1.BaseCompilerError {
    constructor(token) {
        super(`Unknown builtin '${token.value}'`, token);
    }
}
exports.UnknownBuiltinError = UnknownBuiltinError;
//# sourceMappingURL=UnknownBuiltinError.js.map