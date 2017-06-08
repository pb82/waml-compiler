import {TokenProvider} from "../tokenizer/TokenProvider";
import {Parser, Parsing} from "./Parser";
import {DefinitionParser} from "./DefinitionParser";
import {ASTNode} from "./types/ASTNode";

export class Dispatcher extends Parser implements Parsing {
    constructor(tokens: TokenProvider) {
        super(tokens);
    }

    public parse(): ASTNode {
        const definitionParser = new DefinitionParser(this.tokens);
        return definitionParser.parse();
    }
}