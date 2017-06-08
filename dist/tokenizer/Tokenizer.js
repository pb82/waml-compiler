"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
const Definitions_1 = require("./Definitions");
const RX_WHITESPACE = new RegExp("^\\s$");
const RX_NEWLINE = new RegExp("^[\\r\\n]");
class Tokenizer {
    constructor(source) {
        this.tokens = [];
        this.currentLine = 1;
        this.currentIndex = 0;
        this.currentToken = "";
        this.currentString = "";
        this.source = source;
        this.run();
    }
    getTokens() {
        return this.tokens;
    }
    run() {
        let insideString = false;
        for (const char of this.source) {
            if (char === Definitions_1.QUOTATION_MARK && !insideString) {
                insideString = true;
                this.currentIndex++;
                continue;
            }
            else if (char === Definitions_1.QUOTATION_MARK && insideString) {
                this.pushString();
                insideString = false;
                continue;
            }
            else if (insideString && RX_NEWLINE.test(char)) {
                this.currentIndex = 0;
                this.currentLine++;
                continue;
            }
            else if (insideString) {
                this.currentString += char;
                this.currentIndex++;
                continue;
            }
            if (RX_NEWLINE.test(char)) {
                this.pushToken();
                this.currentLine++;
                this.currentIndex = 0;
            }
            else if (RX_WHITESPACE.test(char)) {
                this.pushToken();
                this.currentIndex++;
            }
            else if (Definitions_1.TOKEN_CHARS.indexOf(char) >= 0) {
                this.pushToken();
                this.currentToken = char;
                this.currentIndex++;
                this.pushToken();
            }
            else {
                this.currentToken += char;
                this.currentIndex++;
            }
        }
        this.pushToken();
    }
    pushString() {
        if (this.currentString) {
            const token = new Token_1.Token(this.currentLine, this.currentIndex, this.currentString);
            token.type = Definitions_1.TOKEN_TYPE.STRING;
            this.tokens.push(token);
            this.currentString = "";
        }
    }
    pushToken() {
        if (this.currentToken) {
            const token = new Token_1.Token(this.currentLine, this.currentIndex, this.currentToken);
            this.tokens.push(token);
            this.currentToken = "";
        }
    }
}
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=Tokenizer.js.map