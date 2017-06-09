import {Parser, Parsing} from "./Parser";
import {TokenProvider} from "../tokenizer/TokenProvider";
import {ASTNode} from "./types/ASTNode";
import {TOKEN_TYPE} from "../tokenizer/Definitions";
import StringNode from "./types/impls/StringNode";

export class StringParser extends Parser implements Parsing {
    constructor(tokens: TokenProvider) {
        super(tokens);
    }

    parse(): ASTNode {
        const stringToken = this.tokens.expect(TOKEN_TYPE.STRING);
        const stringNode = new StringNode(stringToken);
        return stringNode;
    }
}