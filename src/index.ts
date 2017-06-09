import {CompilerOptions} from "./CompilerOptions";
import {Tokenizer} from "./tokenizer/Tokenizer";
import {Analyzer} from "./tokenizer/Analyzer";
import {TokenProvider} from "./tokenizer/TokenProvider";
import {Dispatcher} from "./parser/Dispatcher";
import {JavaScriptWriter} from "./writer/JavaScriptWriter";
import {Writer} from "./writer/Writer";

export function compile(options: CompilerOptions): (src: string) => void {
    return function (src: string): void {
        const tokenizer = new Tokenizer(src);
        const analyzer = new Analyzer(tokenizer);
        const provider = new TokenProvider(analyzer);
        const dispatcher = new Dispatcher(provider);
        const ast = dispatcher.parse();

        const writer: Writer = new JavaScriptWriter();
        ast.generateCode(writer);

        console.log(writer.toString());

        return;
    }
}
