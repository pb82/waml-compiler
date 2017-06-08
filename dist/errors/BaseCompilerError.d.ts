import { Token } from "../tokenizer/Token";
export declare class BaseCompilerError extends Error {
    constructor(message: string, token: Token);
}
