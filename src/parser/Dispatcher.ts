import {TokenProvider} from "../tokenizer/TokenProvider";
import {Parser, Parsing} from "./Parser";
import {DefinitionParser} from "./DefinitionParser";
import {ASTNode} from "./types/ASTNode";
import Program from "./types/impls/Program";

export class Dispatcher extends Parser implements Parsing {
    constructor(tokens: TokenProvider) {
        super(tokens);
    }

    public parse(): ASTNode {
        const program = new Program();
        const definitionParser = new DefinitionParser(this.tokens);
        while (this.tokens.hasNext()) {
            const definition = definitionParser.parse();
            program.value.push(definition);
        }

        return program;
    }
}