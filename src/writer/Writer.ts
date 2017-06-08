export interface Writer {
    writeVariable(name: string): void;
    writeNumber(value: number): void;
    writeString(value: string): void;
    commitCommand(): void;
    toString(): string;
}