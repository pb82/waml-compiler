import {ASTNode} from "../ASTNode";
import {Writer} from "../../../writer/Writer";

export default class ArrayExpressionNode implements ASTNode {
    public variable: string;

    public from: ASTNode;
    public to: ASTNode;
    public body: ASTNode;

    generateCode(writer: Writer): void {
    }
}