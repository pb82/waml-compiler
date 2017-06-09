"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OperationNode {
    constructor(token) {
        this.operation = token.value;
    }
    generateCode(writer) {
        this.left.generateCode(writer);
        writer.writeGeneric(this.operation);
        this.right.generateCode(writer);
    }
}
exports.default = OperationNode;
//# sourceMappingURL=OperationNode.js.map