import { Token } from "./Token";
import { TokenSource } from "./TokenSource";
export declare class Tokenizer implements TokenSource {
    private source;
    private tokens;
    private currentLine;
    private currentIndex;
    private currentToken;
    private currentString;
    constructor(source: string);
    getTokens(): Token[];
    private run();
    private pushString();
    private pushToken();
}
