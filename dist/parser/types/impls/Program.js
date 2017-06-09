"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Program {
    constructor() {
        this.value = [];
    }
    generateCode(writer) {
        for (let node of this.value) {
            node.generateCode(writer);
        }
    }
}
exports.default = Program;
//# sourceMappingURL=Program.js.map