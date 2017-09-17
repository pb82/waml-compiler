import {ASTNode} from "../ASTNode";
import {Writer} from "../../../writer/Writer";

export default class ArrayNode implements ASTNode {
    public value: ASTNode[] = [];

    generateCode(writer: Writer): void {
        writer.writeGeneric("[");
        let first: boolean = true;

        for (const item of this.value) {
            if (first) {
                first = false;
            } else {
                writer.writeGeneric(",");
            }
            item.generateCode(writer);
        }

        writer.writeGeneric("]");
    }
}