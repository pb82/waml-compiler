import {TokenProvider} from "../tokenizer/TokenProvider";
import {ASTNode} from "./types/ASTNode";

export interface Parsing {
    parse(): ASTNode;
}

export abstract class Parser {
    protected tokens: TokenProvider;

    constructor(tokens: TokenProvider) {
        this.tokens = tokens;
    }
}