import { Parser, Parsing } from "./Parser";
import { TokenProvider } from "../tokenizer/TokenProvider";
import { ASTNode } from "./types/ASTNode";
export declare class ExpressionParser extends Parser implements Parsing {
    constructor(tokens: TokenProvider);
    private replaceConstants(token);
    private getOperation();
    private getValueFromToken(token);
    private parseOperation(left);
    parse(): ASTNode;
}
