import {ASTNode} from "../ASTNode";
import {Writer} from "../../../writer/Writer";

export default class ArrayExpressionNode implements ASTNode {
    public variable: string;

    public value: ASTNode[] = [];

    generateCode(writer: Writer): void {
    }
}