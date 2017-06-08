export declare enum TOKEN_TYPE {
    LPAREN = 0,
    RPAREN = 1,
    LBRACKET = 2,
    RBRACKET = 3,
    LSQUARE = 4,
    RSQUARE = 5,
    COMMA = 6,
    ARROW = 7,
    COLON = 8,
    STRING = 9,
    NUMBER = 10,
    NAME = 11,
    CLASS = 12,
    ADD = 13,
    SUBTRACT = 14,
    MULTIPLY = 15,
    DIVIDE = 16,
    BUILTIN = 17,
}
export declare const QUOTATION_MARK = "\"";
export declare const TOKEN_CHAR_MAPPING: {
    [key: string]: TOKEN_TYPE;
};
export declare const TOKEN_HUMAN_READABLE: Map<TOKEN_TYPE, string>;
export declare const TOKEN_CHARS: string[];
