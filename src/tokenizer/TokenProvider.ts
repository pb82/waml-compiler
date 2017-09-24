import {Token} from "./Token";
import {TOKEN_TYPE} from "./Definitions";
import {UnexpectedTokenError} from "../errors/UnexpectedTokenError";
import {TokenSource} from "./TokenSource";

/**
 * Provides convenient access for the parser to the token array
 * and also has some methods to check the current status of the
 * token stream
 */
export class TokenProvider {
    private tokens: Token[];
    private index: number = 0;
    private indexStack: number[] = [];

    constructor(source: TokenSource) {
        this.tokens = source.getTokens();
    }

    public hasNext() {
        return this.index < this.tokens.length;
    }

    public next(): Token {
        if (!this.hasNext()) {
            throw new Error("no more tokens");
        }
        return this.tokens[this.index++];
    }

    public peek(): Token {
        return this.tokens[this.index];
    }

    public peekIf(type: TOKEN_TYPE): Token {
        const token = this.tokens[this.index];
        if (token && token.type === type) {
            return token;
        }
        return null;
    }

    public peekIfEither(...types: TOKEN_TYPE[]): Token {
        const token = this.tokens[this.index];
        if (token && types.indexOf(token.type) >= 0) {
            return token;
        }
        return null;
    }

    public peekAhead(lookahead: number): Token {
        return this.tokens[this.index + lookahead];
    }

    public expect(type: TOKEN_TYPE): Token {
        const token = this.next();
        if (token.type === type) {
            return token;
        }
        throw new UnexpectedTokenError(token, type);
    }

    public expectName(name: string): Token {
        const token = this.expect(TOKEN_TYPE.NAME);
        if (token.value === name) {
            return token;
        }
        throw new UnexpectedTokenError(token, TOKEN_TYPE.NAME);
    }

    public takeIf(type: TOKEN_TYPE): Token {
        if (this.peekIf(type)) {
            return this.next();
        }

        return null;
    }

    public expectEither(...types: TOKEN_TYPE[]) {
        const token = this.next();
        if (types.indexOf(token.type) >= 0) {
            return token;
        }
        throw new UnexpectedTokenError(token, ...types);
    }

    public pushState(): void {
        this.indexStack.push(this.index);
    }

    public restoreState(): void {
        if (this.indexStack.length === 0) {
            throw new Error("Parse index corruption");
        }

        this.index = this.indexStack.pop();
    }
}
