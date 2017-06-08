import {Token} from "./Token";
import {TOKEN_CHAR_MAPPING, TOKEN_CHARS, TOKEN_TYPE} from "./Definitions";
import {TokenSource} from "./TokenSource";

const RX_NUMBER = new RegExp("^-?\\d+\\.?\\d*$");

/**
 * Classifies tokens by the shape of their value and sets the
 * `type` property of the Token class. It can distinguish between strings,
 * numbers, control characters, classes (Uppercoase IDs) and names (lowercase IDs)
 */
export class Analyzer implements TokenSource {
    private rawTokens: Token[];

    constructor(source: TokenSource) {
        this.rawTokens = source.getTokens();
        this.run();
    }

    public getTokens(): Token[] {
        return this.rawTokens;
    }

    private run() {
        this.rawTokens = this.rawTokens.map((token) => {
            if (token.type) {
                return token;
            }
            if (TOKEN_CHARS.indexOf(token.value) >= 0) {
                token.type = TOKEN_CHAR_MAPPING[token.value];
            } else if (RX_NUMBER.test(token.value)) {
                token.type = TOKEN_TYPE.NUMBER;
            } else {
                // Uppercase identifiers are classes, lowercase ones
                // are names and identifiers that start with @ are
                // built-ins
                const firstChar = token.value[0];
                if (firstChar === "@") {
                    token.type = TOKEN_TYPE.BUILTIN;
                } else if (firstChar === firstChar.toUpperCase()) {
                    token.type = TOKEN_TYPE.CLASS;
                } else {
                    token.type = TOKEN_TYPE.NAME;
                }
            }
            return token;
        });
    }
}
