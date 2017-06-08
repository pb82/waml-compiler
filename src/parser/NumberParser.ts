import {Parser, Parsing} from "./Parser";
import {TokenProvider} from "../tokenizer/TokenProvider";
import {ASTNode} from "./types/ASTNode";
import {TOKEN_TYPE} from "../tokenizer/Definitions";
import NumberNode from "./types/impls/NumberNode";

export class NumberParser extends Parser implements Parsing {
    constructor(tokens: TokenProvider) {
        super(tokens);
    }

    parse(): ASTNode {
        const numberToken = this.tokens.expect(TOKEN_TYPE.NUMBER);
        const numberNode = new NumberNode(numberToken);
        return numberNode;
    }
}