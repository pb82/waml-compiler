"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NumberNode {
    constructor(number) {
        this.value = parseFloat(number.value);
    }
    generateCode(writer) {
        writer.writeNumber(this.value);
    }
}
exports.default = NumberNode;
//# sourceMappingURL=NumberNode.js.map