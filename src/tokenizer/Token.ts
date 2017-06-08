import {TOKEN_TYPE} from "./Definitions";
/**
 * Base information that every token must hold:
 * The line where it was encountered, the index
 * where it was encountered and the actual value.
 * The `type` property will be determined in the
 * analyze part
 */
export class Token {
    public line: number;
    public index: number;
    public value: string;
    public type: TOKEN_TYPE;

    constructor(line: number, index: number, value: string) {
        this.line = line;
        this.index = index;
        this.value = value;
    }
}
