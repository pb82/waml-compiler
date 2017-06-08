import { Definition } from "../Definition";
import { ASTNode } from "../ASTNode";
import { Writer } from "../../../writer/Writer";
export default class Constant extends Definition implements ASTNode {
    value: ASTNode;
    generateCode(writer: Writer): void;
}
