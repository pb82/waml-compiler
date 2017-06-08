import {Parser, Parsing} from "./Parser";
import {TokenProvider} from "../tokenizer/TokenProvider";
import {TOKEN_TYPE} from "../tokenizer/Definitions";
import {getClassMetadata, getPropertyMetadata} from "../metadata/Metadata";
import {MissingPropertyError} from "../errors/MissingPropertyError";
import {ASTNode} from "./types/ASTNode";
import {UnexpectedTokenError} from "../errors/UnexpectedTokenError";
import {NumberParser} from "./NumberParser";

export class DefinitionParser extends Parser implements Parsing {
    private definedProperties: string[] = [];

    constructor(tokens: TokenProvider) {
        super(tokens);
    }

    private getRequiredProperties(metadata: Map<any, any>): string[] {
        let result: string[] = [];
        for (let property of metadata.keys()) {
            if (metadata.get(property).get("Required")) {
                result.push(property);
            }
        }
        return result;
    }

    private checkDefinedProperties(required: string[]) {
        required.forEach((property) => {
            if (this.definedProperties.indexOf(property) < 0) {
                throw new MissingPropertyError(this.tokens.peek(), property);
            }
        });
    }

    private getParserForType(type: string): Parsing {
        switch (type) {
            case "number":
                return new NumberParser(this.tokens);
            default:
                throw new UnexpectedTokenError(this.tokens.peek());
        }
    }

    private parseProperties(instance: any, metadata: Map<any, any>): void {
        this.tokens.expect(TOKEN_TYPE.LBRACKET);

        while (true) {
            if (this.tokens.peekIf(TOKEN_TYPE.RBRACKET)) {
                break;
            }

            const propertyName = this.tokens.expect(TOKEN_TYPE.NAME).value;
            this.tokens.expect(TOKEN_TYPE.COLON);

            const propertyType = metadata.get(propertyName).get("Type");
            const parser = this.getParserForType(propertyType);
            instance[propertyName] = parser.parse();
            this.definedProperties.push(propertyName);

            if (!this.tokens.peekIf(TOKEN_TYPE.COMMA)) {
                break;
            } else {
                this.tokens.expect(TOKEN_TYPE.COMMA);
            }
        }

        this.checkDefinedProperties(this.getRequiredProperties(metadata));
        this.tokens.expect(TOKEN_TYPE.RBRACKET);
    }

    public parse(): ASTNode {
        const type = this.tokens.expect(TOKEN_TYPE.CLASS);
        const Constructor = require(`./types/impls/${type.value}`).default;
        const instance = new Constructor();

        const classMetadata = getClassMetadata(Constructor);
        const propsMetadata = getPropertyMetadata(Constructor);

        let name;
        if (classMetadata.get("AllowAnon")) {
            if (!(name = this.tokens.takeIf(TOKEN_TYPE.NAME))) {
                instance.anonymous = true;
            }
        } else {
            name = this.tokens.expect(TOKEN_TYPE.NAME);
            instance.anonymous = false;
        }

        instance.name = name.value;
        this.parseProperties(instance, propsMetadata);
        return instance;
    }
}