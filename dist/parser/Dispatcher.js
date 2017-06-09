"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const DefinitionParser_1 = require("./DefinitionParser");
const Program_1 = require("./types/impls/Program");
class Dispatcher extends Parser_1.Parser {
    constructor(tokens) {
        super(tokens);
    }
    parse() {
        const program = new Program_1.default();
        const definitionParser = new DefinitionParser_1.DefinitionParser(this.tokens);
        while (this.tokens.hasNext()) {
            const definition = definitionParser.parse();
            program.value.push(definition);
        }
        return program;
    }
}
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=Dispatcher.js.map