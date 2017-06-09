import { Writer } from "./Writer";
export declare class JavaScriptWriter implements Writer {
    private generated;
    writeVariable(name: string): void;
    writeNumber(value: number): void;
    writeString(value: string): void;
    writeGeneric(value: string): void;
    commitCommand(): void;
    beginFunction(value: string): void;
    endFunction(): void;
    toString(): string;
}
