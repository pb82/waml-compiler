import { ASTNode } from "../ASTNode";
import { Writer } from "../../../writer/Writer";
import { Token } from "../../../tokenizer/Token";
export default class NumberNode implements ASTNode {
    value: number;
    constructor(number: Token);
    generateCode(writer: Writer): void;
}
