import { TOKEN_TYPE } from "./Definitions";
export declare class Token {
    line: number;
    index: number;
    value: string;
    type: TOKEN_TYPE;
    constructor(line: number, index: number, value: string);
}
