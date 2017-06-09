"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const Definitions_1 = require("../tokenizer/Definitions");
const Metadata_1 = require("../metadata/Metadata");
const MissingPropertyError_1 = require("../errors/MissingPropertyError");
const UnexpectedTokenError_1 = require("../errors/UnexpectedTokenError");
const NumberParser_1 = require("./NumberParser");
const StringParser_1 = require("./StringParser");
const UnknownPropertyError_1 = require("../errors/UnknownPropertyError");
const ExpressionParser_1 = require("./ExpressionParser");
class DefinitionParser extends Parser_1.Parser {
    constructor(tokens) {
        super(tokens);
        this.definedProperties = [];
    }
    getRequiredProperties(metadata) {
        let result = [];
        for (let property of metadata.keys()) {
            if (metadata.get(property).get("Required")) {
                result.push(property);
            }
        }
        return result;
    }
    checkDefinedProperties(required) {
        required.forEach((property) => {
            if (this.definedProperties.indexOf(property) < 0) {
                throw new MissingPropertyError_1.MissingPropertyError(this.tokens.peek(), property);
            }
        });
    }
    getParserForType(type) {
        switch (type) {
            case "number":
                return new NumberParser_1.NumberParser(this.tokens);
            case "string":
                return new StringParser_1.StringParser(this.tokens);
            case "expression":
                return new ExpressionParser_1.ExpressionParser(this.tokens);
            default:
                throw new UnexpectedTokenError_1.UnexpectedTokenError(this.tokens.peek());
        }
    }
    parseProperties(instance, metadata) {
        this.tokens.expect(Definitions_1.TOKEN_TYPE.LBRACKET);
        while (true) {
            if (this.tokens.peekIf(Definitions_1.TOKEN_TYPE.RBRACKET)) {
                break;
            }
            const propertyToken = this.tokens.expect(Definitions_1.TOKEN_TYPE.NAME);
            const propertyName = propertyToken.value;
            this.tokens.expect(Definitions_1.TOKEN_TYPE.COLON);
            const propertyMetadata = metadata.get(propertyName);
            if (!propertyMetadata) {
                throw new UnknownPropertyError_1.UnknownPropertyError(propertyToken, metadata);
            }
            const propertyType = propertyMetadata.get("Type");
            const parser = this.getParserForType(propertyType);
            instance[propertyName] = parser.parse();
            this.definedProperties.push(propertyName);
            if (!this.tokens.peekIf(Definitions_1.TOKEN_TYPE.COMMA)) {
                break;
            }
            else {
                this.tokens.expect(Definitions_1.TOKEN_TYPE.COMMA);
            }
        }
        this.checkDefinedProperties(this.getRequiredProperties(metadata));
        this.tokens.expect(Definitions_1.TOKEN_TYPE.RBRACKET);
    }
    parse() {
        const type = this.tokens.expect(Definitions_1.TOKEN_TYPE.CLASS);
        const Constructor = require(`./types/impls/${type.value}`).default;
        const instance = new Constructor();
        const classMetadata = Metadata_1.getClassMetadata(Constructor);
        const propsMetadata = Metadata_1.getPropertyMetadata(Constructor);
        let name;
        if (classMetadata.get("AllowAnon")) {
            if (!(name = this.tokens.takeIf(Definitions_1.TOKEN_TYPE.NAME))) {
                instance.anonymous = true;
            }
        }
        else {
            name = this.tokens.expect(Definitions_1.TOKEN_TYPE.NAME);
            instance.anonymous = false;
        }
        instance.name = name.value;
        this.parseProperties(instance, propsMetadata);
        return instance;
    }
}
exports.DefinitionParser = DefinitionParser;
//# sourceMappingURL=DefinitionParser.js.map