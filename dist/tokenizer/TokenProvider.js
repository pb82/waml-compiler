"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnexpectedTokenError_1 = require("../errors/UnexpectedTokenError");
class TokenProvider {
    constructor(source) {
        this.index = 0;
        this.indexStack = [];
        this.tokens = source.getTokens();
    }
    hasNext() {
        return this.index < this.tokens.length;
    }
    next() {
        if (!this.hasNext()) {
            throw new Error("no more tokens");
        }
        return this.tokens[this.index++];
    }
    peek() {
        return this.tokens[this.index];
    }
    peekIf(type) {
        const token = this.tokens[this.index];
        if (token && token.type === type) {
            return token;
        }
        return null;
    }
    peekIfEither(...types) {
        const token = this.tokens[this.index];
        if (token && types.indexOf(token.type) >= 0) {
            return token;
        }
        return null;
    }
    peekAhead(lookahead) {
        return this.tokens[this.index + lookahead];
    }
    expect(type) {
        const token = this.next();
        if (token.type === type) {
            return token;
        }
        throw new UnexpectedTokenError_1.UnexpectedTokenError(token, type);
    }
    takeIf(type) {
        if (this.peekIf(type)) {
            return this.next();
        }
        return null;
    }
    expectEither(...types) {
        const token = this.next();
        if (types.indexOf(token.type) >= 0) {
            return token;
        }
        throw new UnexpectedTokenError_1.UnexpectedTokenError(token, ...types);
    }
    pushState() {
        this.indexStack.push(this.index);
    }
    restoreState() {
        if (this.indexStack.length === 0) {
            throw new Error("Parse index corruption");
        }
        this.index = this.indexStack.pop();
    }
}
exports.TokenProvider = TokenProvider;
//# sourceMappingURL=TokenProvider.js.map