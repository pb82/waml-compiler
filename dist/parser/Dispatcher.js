"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const DefinitionParser_1 = require("./DefinitionParser");
class Dispatcher extends Parser_1.Parser {
    constructor(tokens) {
        super(tokens);
    }
    parse() {
        const definitionParser = new DefinitionParser_1.DefinitionParser(this.tokens);
        return definitionParser.parse();
    }
}
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=Dispatcher.js.map