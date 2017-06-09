"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringNode {
    constructor(number) {
        this.value = number.value;
    }
    generateCode(writer) {
        writer.writeString(this.value);
    }
}
exports.default = StringNode;
//# sourceMappingURL=StringNode.js.map