"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Terminal {
    generateCode(writer) {
        writer.writeTerminal(this.value);
    }
}
exports.default = Terminal;
