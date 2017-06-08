import {Token} from "./Token";

export interface TokenSource {
    getTokens(): Token[];
}