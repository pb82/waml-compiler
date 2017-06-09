import { ASTNode } from "../ASTNode";
import { Writer } from "../../../writer/Writer";
import { Token } from "../../../tokenizer/Token";
export default class StringNode implements ASTNode {
    value: string;
    constructor(number: Token);
    generateCode(writer: Writer): void;
}
