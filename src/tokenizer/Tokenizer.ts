import {Token} from "./Token";
import {QUOTATION_MARK, TOKEN_CHARS, TOKEN_TYPE} from "./Definitions";
import {TokenSource} from "./TokenSource";

const RX_WHITESPACE = new RegExp("^\\s$");
const RX_NEWLINE = new RegExp("^[\\r\\n]");

/**
 * The Tokenizer will take a string input and break it down into
 * tokens that can be further analyzed.
 */
export class Tokenizer implements TokenSource {
    private source: string;
    private tokens: Token[] = [];
    private currentLine: number = 1;
    private currentIndex: number = 0;
    private currentToken: string = "";
    private currentString: string = "";

    constructor(source: string) {
        this.source = source;
        this.run();
    }

    public getTokens(): Token[] {
        return this.tokens;
    }

    private run() {
        let insideString: boolean = false;
        for (const char of this.source) {
            // String handling
            if (char === QUOTATION_MARK && !insideString) {
                insideString = true;
                this.currentIndex++;
                continue;
            } else if (char === QUOTATION_MARK && insideString) {
                this.pushString();
                insideString = false;
                continue;
            } else if (insideString && RX_NEWLINE.test(char)) {
                this.currentIndex = 0;
                this.currentLine++;
                continue;
            } else if (insideString) {
                this.currentString += char;
                this.currentIndex++;
                continue;
            }

            // Non-string handling
            if (RX_NEWLINE.test(char)) {
                // Newline: push token, increase line count and reset index
                this.pushToken();
                this.currentLine++;
                this.currentIndex = 0;
            } else if (RX_WHITESPACE.test(char)) {
                // Whitespace: token separator, increase index
                this.pushToken();
                this.currentIndex++;
            } else if (TOKEN_CHARS.indexOf(char) >= 0) {
                // Terminator char: push token and terminator
                this.pushToken();
                this.currentToken = char;
                this.currentIndex++;
                this.pushToken();
            } else {
                // Character: append to the current char value
                this.currentToken += char;
                this.currentIndex++;
            }
        }
        // It's not required that the source ends with a newline or a
        // whitespace char, so there might still be an unterminated
        // token
        this.pushToken();
    }

    private pushString() {
        if (this.currentString) {
            const token = new Token(this.currentLine, this.currentIndex, this.currentString);
            token.type = TOKEN_TYPE.STRING;
            this.tokens.push(token);
            this.currentString = "";
        }
    }

    private pushToken() {
        if (this.currentToken) {
            const token = new Token(this.currentLine, this.currentIndex, this.currentToken);
            this.tokens.push(token);
            this.currentToken = "";
        }
    }
}
