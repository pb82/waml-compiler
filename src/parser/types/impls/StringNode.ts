import {ASTNode} from "../ASTNode";
import {Writer} from "../../../writer/Writer";
import {Token} from "../../../tokenizer/Token";

export default class StringNode implements ASTNode {
    public value: string;

    constructor(number: Token) {
        this.value = number.value;
    }

    generateCode(writer: Writer): void {
        writer.writeString(this.value);
    }
}