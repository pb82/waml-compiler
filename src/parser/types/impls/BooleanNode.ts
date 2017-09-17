import {ASTNode} from "../ASTNode";
import {Writer} from "../../../writer/Writer";
import {Token} from "../../../tokenizer/Token";

export default class BooleanNode implements ASTNode {
    public value: boolean;

    constructor(boolean: Token) {
        this.value = new Boolean(boolean.value).valueOf();
    }

    generateCode(writer: Writer): void {
        writer.writeBoolean(this.value);
    }
}