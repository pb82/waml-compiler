import { BaseCompilerError } from "./BaseCompilerError";
import { Token } from "../tokenizer/Token";
export declare class UnknownPropertyError extends BaseCompilerError {
    constructor(token: Token, expected: Map<any, any>);
}
