"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FunctionCallNode {
    constructor(fn) {
        this.function = fn;
    }
    generateCode(writer) {
        writer.beginFunction(this.function);
        this.argument.generateCode(writer);
        writer.endFunction();
    }
}
exports.default = FunctionCallNode;
//# sourceMappingURL=FunctionCallNode.js.map