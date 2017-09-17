export interface Writer {
    writeVariable(name: string): void;
    writeNumber(value: number): void;
    writeString(value: string): void;
    writeBoolean(value: boolean): void;
    writeGeneric(value: string): void;

    beginFunction(value: string): void;
    endFunction(): void;

    commitCommand(): void;
    reset(): void;
    toString(): string;
}