import { ASTNode } from "../ASTNode";
import { Writer } from "../../../writer/Writer";
export default class Terminal implements ASTNode {
    value: string | number | boolean;
    generateCode(writer: Writer): void;
}
