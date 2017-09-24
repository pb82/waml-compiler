import {Definition} from "../Definition";
import {ASTNode} from "../ASTNode";
import {Type} from "../../../metadata/Type";
import {Writer} from "../../../writer/Writer";
import {Required} from "../../../metadata/Required";
import {AllowAnon} from "../../../metadata/AllowAnon";
import {IsDefinition} from "../../../metadata/IsDefinition";


@IsDefinition(true)
@AllowAnon(false)
export default class Constant extends Definition implements ASTNode {
    @Type("array")
    @Required(true)
    public value: ASTNode;

    generateCode(writer: Writer): void {
        writer.writeVariable(this.name);
        this.value.generateCode(writer);
        writer.commitCommand();
    }
}