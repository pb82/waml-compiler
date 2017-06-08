"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCompilerError_1 = require("./BaseCompilerError");
const Definitions_1 = require("../tokenizer/Definitions");
class UnexpectedTokenError extends BaseCompilerError_1.BaseCompilerError {
    constructor(token, ...expected) {
        const valid = expected.map((token) => {
            return Definitions_1.TOKEN_HUMAN_READABLE.get(token);
        }).join(' or ');
        const expectedString = `. Expected ${valid}`;
        super(`Unexpected token '${token.value}'${expectedString}`, token);
    }
}
exports.UnexpectedTokenError = UnexpectedTokenError;
//# sourceMappingURL=UnexpectedTokenError.js.map