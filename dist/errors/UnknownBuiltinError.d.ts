import { BaseCompilerError } from "./BaseCompilerError";
import { Token } from "../tokenizer/Token";
export declare class UnknownBuiltinError extends BaseCompilerError {
    constructor(token: Token);
}
