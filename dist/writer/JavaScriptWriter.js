"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JavaScriptWriter {
    constructor() {
        this.generated = [];
    }
    writeVariable(name) {
        const code = `var ${name}=`;
        this.generated.push(code);
    }
    writeNumber(value) {
        this.generated.push(value.toString());
    }
    writeString(value) {
        this.generated.push(`"${value}"`);
    }
    writeGeneric(value) {
        this.generated.push(`${value}`);
    }
    commitCommand() {
        this.generated.push(';\n');
    }
    beginFunction(value) {
        this.generated.push(`${value}(`);
    }
    endFunction() {
        this.generated.push(")");
        this.commitCommand();
    }
    toString() {
        return this.generated.join('');
    }
}
exports.JavaScriptWriter = JavaScriptWriter;
//# sourceMappingURL=JavaScriptWriter.js.map