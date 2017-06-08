"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const Definitions_1 = require("../tokenizer/Definitions");
const NumberNode_1 = require("./types/impls/NumberNode");
class NumberParser extends Parser_1.Parser {
    constructor(tokens) {
        super(tokens);
    }
    parse() {
        const numberToken = this.tokens.expect(Definitions_1.TOKEN_TYPE.NUMBER);
        const numberNode = new NumberNode_1.default(numberToken);
        return numberNode;
    }
}
exports.NumberParser = NumberParser;
//# sourceMappingURL=NumberParser.js.map