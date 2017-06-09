"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tokenizer_1 = require("./tokenizer/Tokenizer");
const Analyzer_1 = require("./tokenizer/Analyzer");
const TokenProvider_1 = require("./tokenizer/TokenProvider");
const Dispatcher_1 = require("./parser/Dispatcher");
const JavaScriptWriter_1 = require("./writer/JavaScriptWriter");
function compile(options) {
    return function (src) {
        const tokenizer = new Tokenizer_1.Tokenizer(src);
        const analyzer = new Analyzer_1.Analyzer(tokenizer);
        const provider = new TokenProvider_1.TokenProvider(analyzer);
        const dispatcher = new Dispatcher_1.Dispatcher(provider);
        const ast = dispatcher.parse();
        const writer = new JavaScriptWriter_1.JavaScriptWriter();
        ast.generateCode(writer);
        console.log(writer.toString());
        return;
    };
}
exports.compile = compile;
//# sourceMappingURL=index.js.map