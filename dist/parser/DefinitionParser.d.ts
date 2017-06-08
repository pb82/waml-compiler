import { Parser, Parsing } from "./Parser";
import { TokenProvider } from "../tokenizer/TokenProvider";
import { ASTNode } from "./types/ASTNode";
export declare class DefinitionParser extends Parser implements Parsing {
    private definedProperties;
    constructor(tokens: TokenProvider);
    private getRequiredProperties(metadata);
    private checkDefinedProperties(required);
    private getParserForType(type);
    private parseProperties(instance, metadata);
    parse(): ASTNode;
}
