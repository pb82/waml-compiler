"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Definitions_1 = require("./Definitions");
const RX_NUMBER = new RegExp("^-?\\d+\\.?\\d*$");
class Analyzer {
    constructor(source) {
        this.rawTokens = source.getTokens();
        this.run();
    }
    getTokens() {
        return this.rawTokens;
    }
    run() {
        this.rawTokens = this.rawTokens.map((token) => {
            if (token.type) {
                return token;
            }
            if (Definitions_1.TOKEN_CHARS.indexOf(token.value) >= 0) {
                token.type = Definitions_1.TOKEN_CHAR_MAPPING[token.value];
            }
            else if (RX_NUMBER.test(token.value)) {
                token.type = Definitions_1.TOKEN_TYPE.NUMBER;
            }
            else {
                const firstChar = token.value[0];
                if (firstChar === "@") {
                    token.type = Definitions_1.TOKEN_TYPE.BUILTIN;
                }
                else if (firstChar === firstChar.toUpperCase()) {
                    token.type = Definitions_1.TOKEN_TYPE.CLASS;
                }
                else {
                    token.type = Definitions_1.TOKEN_TYPE.NAME;
                }
            }
            return token;
        });
    }
}
exports.Analyzer = Analyzer;
//# sourceMappingURL=Analyzer.js.map