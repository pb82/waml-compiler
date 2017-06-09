import {ASTNode} from "../ASTNode";
import {Writer} from "../../../writer/Writer";

export default class Program implements ASTNode {
    public value: ASTNode[] = [];

    generateCode(writer: Writer): void {
        for (let node of this.value) {
            node.generateCode(writer);
        }
    }
}