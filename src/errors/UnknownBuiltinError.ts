import {BaseCompilerError} from "./BaseCompilerError";
import {Token} from "../tokenizer/Token";

export class UnknownBuiltinError extends BaseCompilerError {
    constructor(token: Token) {
        super(`Unknown builtin '${token.value}'`, token);
    }
}