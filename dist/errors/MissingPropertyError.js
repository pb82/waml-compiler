"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCompilerError_1 = require("./BaseCompilerError");
class MissingPropertyError extends BaseCompilerError_1.BaseCompilerError {
    constructor(token, missing) {
        super(`Missing property '${missing}'`, token);
    }
}
exports.MissingPropertyError = MissingPropertyError;
//# sourceMappingURL=MissingPropertyError.js.map