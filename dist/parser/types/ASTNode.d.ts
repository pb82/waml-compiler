import { Writer } from "../../writer/Writer";
export interface ASTNode {
    generateCode(writer: Writer): void;
}
