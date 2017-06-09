import { ASTNode } from "../ASTNode";
import { Writer } from "../../../writer/Writer";
import { Token } from "../../../tokenizer/Token";
export default class OperationNode implements ASTNode {
    operation: string;
    left: ASTNode;
    right: ASTNode;
    constructor(token: Token);
    generateCode(writer: Writer): void;
}
