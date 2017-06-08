import { BaseCompilerError } from "./BaseCompilerError";
import { Token } from "../tokenizer/Token";
import { TOKEN_TYPE } from "../tokenizer/Definitions";
export declare class UnexpectedTokenError extends BaseCompilerError {
    constructor(token: Token, ...expected: TOKEN_TYPE[]);
}
