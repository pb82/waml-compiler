import { BaseCompilerError } from "./BaseCompilerError";
import { Token } from "../tokenizer/Token";
export declare class MissingPropertyError extends BaseCompilerError {
    constructor(token: Token, missing: string);
}
