"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const Definitions_1 = require("../tokenizer/Definitions");
const StringNode_1 = require("./types/impls/StringNode");
class StringParser extends Parser_1.Parser {
    constructor(tokens) {
        super(tokens);
    }
    parse() {
        const stringToken = this.tokens.expect(Definitions_1.TOKEN_TYPE.STRING);
        const stringNode = new StringNode_1.default(stringToken);
        return stringNode;
    }
}
exports.StringParser = StringParser;
//# sourceMappingURL=StringParser.js.map