import { Token } from "./Token";
import { TOKEN_TYPE } from "./Definitions";
import { TokenSource } from "./TokenSource";
export declare class TokenProvider {
    private tokens;
    private index;
    private indexStack;
    constructor(source: TokenSource);
    hasNext(): boolean;
    next(): Token;
    peek(): Token;
    peekIf(type: TOKEN_TYPE): Token;
    peekIfEither(...types: TOKEN_TYPE[]): Token;
    peekAhead(lookahead: number): Token;
    expect(type: TOKEN_TYPE): Token;
    takeIf(type: TOKEN_TYPE): Token;
    expectEither(...types: TOKEN_TYPE[]): Token;
    pushState(): void;
    restoreState(): void;
}
