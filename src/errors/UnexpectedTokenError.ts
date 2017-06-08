import {BaseCompilerError} from "./BaseCompilerError";
import {Token} from "../tokenizer/Token";
import {TOKEN_HUMAN_READABLE, TOKEN_TYPE} from "../tokenizer/Definitions";

export class UnexpectedTokenError extends BaseCompilerError {
    constructor(token: Token, ...expected: TOKEN_TYPE[]) {
        const valid: string = expected.map((token) => {
            return TOKEN_HUMAN_READABLE.get(token);
        }).join(' or ');

        const expectedString = `. Expected ${valid}`;
        super(`Unexpected token '${token.value}'${expectedString}`, token);
    }
}