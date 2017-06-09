import {ASTNode} from "../ASTNode";
import {Writer} from "../../../writer/Writer";
import {Token} from "../../../tokenizer/Token";

export default class ReferenceNode implements ASTNode {
    public value: string;

    constructor(reference: Token) {
        this.value = reference.value;
    }

    generateCode(writer: Writer): void {
        writer.writeGeneric(this.value);
    }
}