import {ASTNode} from "../ASTNode";
import {Writer} from "../../../writer/Writer";

export default class FunctionCallNode implements ASTNode {
    public function: string;
    public argument: ASTNode;

    constructor(fn: string) {
        this.function = fn;
    }

    generateCode(writer: Writer): void {
        writer.beginFunction(this.function);
        this.argument.generateCode(writer);
        writer.endFunction();
    }
}