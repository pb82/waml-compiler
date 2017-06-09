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

const MATH_CONSTANTS: Map<string, number> = new Map();
MATH_CONSTANTS.set("@pi", 3.14159265359);

const MATH_FUNCTIONS: Map<string, string> = new Map();
MATH_FUNCTIONS.set("@sin", "Math.sin");
MATH_FUNCTIONS.set("@cos", "Math.cos");

export class ExpressionParser extends Parser implements Parsing {
    constructor(tokens: TokenProvider) {
        super(tokens);
    }

    private replaceConstants(token: Token): void {
        if (token.type === TOKEN_TYPE.BUILTIN && MATH_CONSTANTS.get(token.value)) {
            token.type = TOKEN_TYPE.NUMBER;
            token.value = MATH_CONSTANTS.get(token.value) + '';
        } else if (token.type === TOKEN_TYPE.BUILTIN && !MATH_FUNCTIONS.get(token.value)) {
            throw new UnknownBuiltinError(token);
        }
    }

    private getOperation(): Token {
        return this.tokens.peekIfEither(TOKEN_TYPE.ADD, TOKEN_TYPE.SUBTRACT, TOKEN_TYPE.MULTIPLY, TOKEN_TYPE.DIVIDE);
    }

    private getValueFromToken(token: Token): ASTNode {
        if (token.type === TOKEN_TYPE.NUMBER) {
            return new NumberNode(token);
        } else if (token.type === TOKEN_TYPE.NAME) {
            return new ReferenceNode(token);
        }

        throw new UnexpectedTokenError(token, TOKEN_TYPE.NUMBER, TOKEN_TYPE.NAME);
    }

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

    parse(): ASTNode {
        const token = this.tokens.next();

        this.replaceConstants(token);

        if (token.type === TOKEN_TYPE.NUMBER || token.type === TOKEN_TYPE.NAME) {
            const valueNode = this.getValueFromToken(token);
            return this.parseOperation(valueNode);
        } else if (token.type === TOKEN_TYPE.BUILTIN) {
            this.tokens.expect(TOKEN_TYPE.LPAREN);
            const expressionNode = this.parse();
            this.tokens.expect(TOKEN_TYPE.RPAREN);

            const functionCallNode = new FunctionCallNode(MATH_FUNCTIONS.get(token.value));
            functionCallNode.argument = expressionNode;

            return this.parseOperation(functionCallNode);
        }

        return null;
    }
}