import { ASTNode } from "../ASTNode";
import { Writer } from "../../../writer/Writer";
import { Token } from "../../../tokenizer/Token";
export default class ReferenceNode implements ASTNode {
    value: string;
    constructor(reference: Token);
    generateCode(writer: Writer): void;
}
