import { ASTNode } from "../ASTNode";
import { Writer } from "../../../writer/Writer";
export default class Program implements ASTNode {
    value: ASTNode[];
    generateCode(writer: Writer): void;
}
