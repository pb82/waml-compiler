import { Parser, Parsing } from "./Parser";
import { TokenProvider } from "../tokenizer/TokenProvider";
import { ASTNode } from "./types/ASTNode";
export declare class NumberParser extends Parser implements Parsing {
    constructor(tokens: TokenProvider);
    parse(): ASTNode;
}
