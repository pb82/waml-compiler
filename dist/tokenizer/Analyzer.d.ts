import { Token } from "./Token";
import { TokenSource } from "./TokenSource";
export declare class Analyzer implements TokenSource {
    private rawTokens;
    constructor(source: TokenSource);
    getTokens(): Token[];
    private run();
}
