import {BaseCompilerError} from "./BaseCompilerError";
import {Token} from "../tokenizer/Token";

export class UnknownPropertyError extends BaseCompilerError {
    constructor(token: Token, expected: Map<any, any>) {
        let keys = [];
        for (let key of expected.keys()) {
            keys.push(key.value);
        }

        const valid = keys.join(' or ');
        const expectedString = `. Expected ${valid}`;

        super(`Unknown property '${token.value}'${expectedString}`, token);
    }
}