import {Writer} from "./Writer";

export class JavaScriptWriter implements Writer {
    private generated: string[] = [];

    writeVariable(name: string): void {
        const code = `var ${name}=`;
        this.generated.push(code);
    }

    writeNumber(value: number) {
        this.generated.push(value.toString());
    }

    writeString(value: string) {
        this.generated.push(`"${value}"`);
    }

    writeGeneric(value: string) {
        this.generated.push(`${value}`);
    }

    commitCommand(): void {
        this.generated.push(';\n');
    }

    beginFunction(value: string): void {
        this.generated.push(`${value}(`);
    }

    endFunction(): void {
        this.generated.push(")");
        this.commitCommand();
    }

    toString(): string {
        return this.generated.join('');
    }
}