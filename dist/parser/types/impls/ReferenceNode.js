"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReferenceNode {
    constructor(reference) {
        this.value = reference.value;
    }
    generateCode(writer) {
        writer.writeGeneric(this.value);
    }
}
exports.default = ReferenceNode;
//# sourceMappingURL=ReferenceNode.js.map