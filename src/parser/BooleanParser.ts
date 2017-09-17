import {Parser, Parsing} from "./Parser";
import {TokenProvider} from "../tokenizer/TokenProvider";
import {ASTNode} from "./types/ASTNode";
import {TOKEN_TYPE} from "../tokenizer/Definitions";
import BooleanNode from "./types/impls/BooleanNode";

export class BooleanParser extends Parser implements Parsing {
    constructor(tokens: TokenProvider) {
        super(tokens);
    }

    parse(): ASTNode {
        const booleanToken = this.tokens.expect(TOKEN_TYPE.BOOLEAN);
        const booleanNode = new BooleanNode(booleanToken);
        return booleanNode;
    }
}