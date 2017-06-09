"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const Definitions_1 = require("../tokenizer/Definitions");
const UnknownBuiltinError_1 = require("../errors/UnknownBuiltinError");
const NumberNode_1 = require("./types/impls/NumberNode");
const ReferenceNode_1 = require("./types/impls/ReferenceNode");
const UnexpectedTokenError_1 = require("../errors/UnexpectedTokenError");
const OperationNode_1 = require("./types/impls/OperationNode");
const FunctionCallNode_1 = require("./types/impls/FunctionCallNode");
const MATH_CONSTANTS = new Map();
MATH_CONSTANTS.set("@pi", 3.14159265359);
const MATH_FUNCTIONS = new Map();
MATH_FUNCTIONS.set("@sin", "Math.sin");
MATH_FUNCTIONS.set("@cos", "Math.cos");
class ExpressionParser extends Parser_1.Parser {
    constructor(tokens) {
        super(tokens);
    }
    replaceConstants(token) {
        if (token.type === Definitions_1.TOKEN_TYPE.BUILTIN && MATH_CONSTANTS.get(token.value)) {
            token.type = Definitions_1.TOKEN_TYPE.NUMBER;
            token.value = MATH_CONSTANTS.get(token.value) + '';
        }
        else if (token.type === Definitions_1.TOKEN_TYPE.BUILTIN && !MATH_FUNCTIONS.get(token.value)) {
            throw new UnknownBuiltinError_1.UnknownBuiltinError(token);
        }
    }
    getOperation() {
        return this.tokens.peekIfEither(Definitions_1.TOKEN_TYPE.ADD, Definitions_1.TOKEN_TYPE.SUBTRACT, Definitions_1.TOKEN_TYPE.MULTIPLY, Definitions_1.TOKEN_TYPE.DIVIDE);
    }
    getValueFromToken(token) {
        if (token.type === Definitions_1.TOKEN_TYPE.NUMBER) {
            return new NumberNode_1.default(token);
        }
        else if (token.type === Definitions_1.TOKEN_TYPE.NAME) {
            return new ReferenceNode_1.default(token);
        }
        throw new UnexpectedTokenError_1.UnexpectedTokenError(token, Definitions_1.TOKEN_TYPE.NUMBER, Definitions_1.TOKEN_TYPE.NAME);
    }
    parseOperation(left) {
        const operation = this.getOperation();
        if (operation) {
            this.tokens.next();
            const operationNode = new OperationNode_1.default(operation);
            operationNode.left = left;
            operationNode.right = this.parse();
            return operationNode;
        }
        else {
            return left;
        }
    }
    parse() {
        const token = this.tokens.next();
        this.replaceConstants(token);
        if (token.type === Definitions_1.TOKEN_TYPE.NUMBER || token.type === Definitions_1.TOKEN_TYPE.NAME) {
            const valueNode = this.getValueFromToken(token);
            return this.parseOperation(valueNode);
        }
        else if (token.type === Definitions_1.TOKEN_TYPE.BUILTIN) {
            this.tokens.expect(Definitions_1.TOKEN_TYPE.LPAREN);
            const expressionNode = this.parse();
            this.tokens.expect(Definitions_1.TOKEN_TYPE.RPAREN);
            const functionCallNode = new FunctionCallNode_1.default(MATH_FUNCTIONS.get(token.value));
            functionCallNode.argument = expressionNode;
            return this.parseOperation(functionCallNode);
        }
        return null;
    }
}
exports.ExpressionParser = ExpressionParser;
//# sourceMappingURL=ExpressionParser.js.map