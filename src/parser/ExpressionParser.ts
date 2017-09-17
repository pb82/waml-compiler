import {Parser, Parsing} from "./Parser";
import {TokenProvider} from "../tokenizer/TokenProvider";
import {ASTNode} from "./types/ASTNode";
import {Token} from "../tokenizer/Token";
import {TOKEN_TYPE} from "../tokenizer/Definitions";
import {UnknownBuiltinError} from "../errors/UnknownBuiltinError";
import NumberNode from "./types/impls/NumberNode";
import ReferenceNode from "./types/impls/ReferenceNode";
import {UnexpectedTokenError} from "../errors/UnexpectedTokenError";
import OperationNode from "./types/impls/OperationNode";
import FunctionCallNode from "./types/impls/FunctionCallNode";
import InnerExpressionNode from "./types/impls/InnerExpressionNode";

const MATH_CONSTANTS: Map<string, number> = new Map();
MATH_CONSTANTS.set("@pi", 3.14159265359);

const MATH_FUNCTIONS: Map<string, string> = new Map();
MATH_FUNCTIONS.set("@sin", "Math.sin");
MATH_FUNCTIONS.set("@cos", "Math.cos");

export class ExpressionParser extends Parser implements Parsing {
    constructor(tokens: TokenProvider) {
        super(tokens);
    }

    // Replaces constants in the source code with their value. Constants are always numbers
    // e.g. `value: @pi` will be replaced with `value: 3.14159265359`
    private replaceConstants(token: Token): void {
        if (token.type === TOKEN_TYPE.BUILTIN && MATH_CONSTANTS.get(token.value)) {
            token.type = TOKEN_TYPE.NUMBER;
            token.value = MATH_CONSTANTS.get(token.value) + '';
        } else if (token.type === TOKEN_TYPE.BUILTIN && !MATH_FUNCTIONS.get(token.value)) {
            throw new UnknownBuiltinError(token);
        }
    }

    // Return the operation (+,-,*,/) if the next node is an operation node. Otherwise return null.
    private getOperation(): Token {
        return this.tokens.peekIfEither(TOKEN_TYPE.ADD, TOKEN_TYPE.SUBTRACT, TOKEN_TYPE.MULTIPLY, TOKEN_TYPE.DIVIDE);
    }

    // Expressions can only contain numbers or references (other than operations and parenthesis but they
    // are resolved elsewhere)
    private getValueFromToken(token: Token): ASTNode {
        if (token.type === TOKEN_TYPE.NUMBER) {
            return new NumberNode(token);
        } else if (token.type === TOKEN_TYPE.NAME) {
            return new ReferenceNode(token);
        }

        throw new UnexpectedTokenError(token, TOKEN_TYPE.NUMBER, TOKEN_TYPE.NAME);
    }

    // Parse an operation in the form
    // <left> <operation> <right>
    // where the value of the left side is passed as an argument and the right side is parsed
    // from the stream
    private parseOperation(left: ASTNode): ASTNode {
        const operation = this.getOperation();
        if (operation) {
            this.tokens.next();
            const operationNode = new OperationNode(operation);
            operationNode.left = left;
            operationNode.right = this.parse();
            return operationNode;
        } else {
            return left;
        }
    }

    /**
     * Expression parser entry point
     * @returns {ASTNode} An ASTNode representing the expression
     */
    parse(): ASTNode {
        const token = this.tokens.next();

        this.replaceConstants(token);

        if (token.type === TOKEN_TYPE.NUMBER || token.type === TOKEN_TYPE.NAME) {
            // Ordinary expression

            const valueNode = this.getValueFromToken(token);
            return this.parseOperation(valueNode);
        } else if (token.type === TOKEN_TYPE.BUILTIN) {
            // Function call

            this.tokens.expect(TOKEN_TYPE.LPAREN);
            const expressionNode = this.parse();
            this.tokens.expect(TOKEN_TYPE.RPAREN);

            const functionCallNode = new FunctionCallNode(MATH_FUNCTIONS.get(token.value));
            functionCallNode.argument = expressionNode;

            return this.parseOperation(functionCallNode);
        } else {
            // Parenthesis

            const expressionNode = this.parse();
            this.tokens.expect(TOKEN_TYPE.RPAREN);

            const operation = this.getOperation();
            if (operation) {
                return this.parseOperation(expressionNode);
            } else {
                return new InnerExpressionNode(expressionNode);
            }
        }
    }
}