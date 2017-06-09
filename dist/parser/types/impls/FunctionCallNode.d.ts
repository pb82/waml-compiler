import { ASTNode } from "../ASTNode";
import { Writer } from "../../../writer/Writer";
export default class FunctionCallNode implements ASTNode {
    function: string;
    argument: ASTNode;
    constructor(fn: string);
    generateCode(writer: Writer): void;
}
