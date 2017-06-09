import {ASTNode} from "../ASTNode";
import {Writer} from "../../../writer/Writer";
import {Token} from "../../../tokenizer/Token";

export default class OperationNode implements ASTNode {
    public operation: string;
    public left: ASTNode;
    public right: ASTNode;

    constructor(token: Token) {
        this.operation = token.value;
    }

    generateCode(writer: Writer): void {
        this.left.generateCode(writer);
        writer.writeGeneric(this.operation);
        this.right.generateCode(writer);
    }
}