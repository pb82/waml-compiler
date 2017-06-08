import {ASTNode} from "../ASTNode";
import {Writer} from "../../../writer/Writer";
import {Token} from "../../../tokenizer/Token";

export default class NumberNode implements ASTNode {
    public value: number;

    constructor(number: Token) {
        this.value = parseFloat(number.value);
    }

    generateCode(writer: Writer): void {
        writer.writeNumber(this.value);
    }
}