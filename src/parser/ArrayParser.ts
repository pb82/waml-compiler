import {Parser, Parsing} from "./Parser";
import {TokenProvider} from "../tokenizer/TokenProvider";
import {ASTNode} from "./types/ASTNode";
import {TOKEN_TYPE} from "../tokenizer/Definitions";
import ArrayNode from "./types/impls/ArrayNode";
import {ExpressionParser} from "./ExpressionParser";
import ArrayExpressionNode from "./types/impls/ArrayExpressionNode";

export class ArrayParser extends Parser implements Parsing {
    constructor(tokens: TokenProvider) {
        super(tokens);
    }

    parse(): ASTNode {
        try {
            this.tokens.pushState();
            return this.parseArray();
        } catch(_err) {
            this.tokens.restoreState();
            return this.parseArrayExpression();
        }
    }

    parseArray(): ASTNode {
        this.tokens.expect(TOKEN_TYPE.LSQUARE);

        const array: ArrayNode = new ArrayNode();

        // Empty array
        if (this.tokens.peekIf(TOKEN_TYPE.RSQUARE)) {
            return array;
        }

        while (true) {
            const expression = this.readExpression();
            array.value.push(expression);

            if (!this.tokens.peekIf(TOKEN_TYPE.COMMA)) {
                break;
            }
            this.tokens.expect(TOKEN_TYPE.COMMA);
        }

        this.tokens.expect(TOKEN_TYPE.RSQUARE);
        return array;
    }

    parseArrayExpression(): ASTNode {
        this.tokens.expect(TOKEN_TYPE.LSQUARE);
        const array: ArrayExpressionNode = new ArrayExpressionNode();
        array.variable = this.tokens.expect(TOKEN_TYPE.NAME).value;
        this.tokens.expect(TOKEN_TYPE.COMMA);
        array.from = this.readExpression();
        this.tokens.expectName("to");
        array.to = this.readExpression();
        this.tokens.expect(TOKEN_TYPE.COMMA);
        array.body = this.readExpression();
        this.tokens.expect(TOKEN_TYPE.RSQUARE);
        return array;
    }

    private readExpression(): ASTNode {
        const expressionParser = new ExpressionParser(this.tokens);
        return expressionParser.parse();
    }
}