import { TokenProvider } from "../tokenizer/TokenProvider";
import { Parser, Parsing } from "./Parser";
import { ASTNode } from "./types/ASTNode";
export declare class Dispatcher extends Parser implements Parsing {
    constructor(tokens: TokenProvider);
    parse(): ASTNode;
}
