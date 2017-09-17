import {ASTNode} from "../ASTNode";
import {Writer} from "../../../writer/Writer";

export default class InnerExpressionNode implements ASTNode {
    public value: ASTNode;

    constructor(node: ASTNode) {
        this.value = node;
    }

    generateCode(writer: Writer): void {
        writer.writeGeneric("(");
        this.value.generateCode(writer);
        writer.writeGeneric(")");
    }
}