import {Token} from "../tokenizer/Token";

export class BaseCompilerError extends Error {
    constructor(message: string, token: Token) {
        const index = token.index - token.value.length;
        super(`${message} at ${token.line}:${index}`);
    }
}