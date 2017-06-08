import {BaseCompilerError} from "./BaseCompilerError";
import {Token} from "../tokenizer/Token";

export class MissingPropertyError extends BaseCompilerError {
    constructor(token: Token, missing: string) {
        super(`Missing property '${missing}'`, token);
    }
}