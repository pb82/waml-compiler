"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseCompilerError extends Error {
    constructor(message, token) {
        const index = token.index - token.value.length;
        super(`${message} at ${token.line}:${index}`);
    }
}
exports.BaseCompilerError = BaseCompilerError;
//# sourceMappingURL=BaseCompilerError.js.map