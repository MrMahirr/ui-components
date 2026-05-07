import SimpleCodeEditor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import { cn } from '../../utils/cn';

// Handle ESModule / CommonJS default import discrepancy in Vite
const Editor = (SimpleCodeEditor as any).default || SimpleCodeEditor;

interface CodeFieldProps {
    value: string;
    onChange: (value: string) => void;
    language: 'jsx' | 'html' | 'css' | 'json';
    label: string;
    labelIcon?: React.ReactNode;
    labelColorClass?: string;
    placeholder?: string;
    showLineNumbers?: boolean;
    error?: string;
    className?: string;
}


/**
 * SOLID-compliant, highly-typed reusable code editor field.
 * Combines react-simple-code-editor with light-loaded prismjs tokenization.
 * Supports synchronized line numbers and elegant custom scrollbars/borders.
 */
export function CodeField({
    value,
    onChange,
    language,
    label,
    labelIcon,
    labelColorClass = 'text-primary',
    placeholder,
    showLineNumbers = true,
    error,
    className,
}: CodeFieldProps) {
    const highlightCode = (code: string): string => {
        let grammar;
        switch (language) {
            case 'jsx':
                grammar = Prism.languages.jsx;
                break;
            case 'html':
                grammar = Prism.languages.markup;
                break;
            case 'css':
                grammar = Prism.languages.css;
                break;
            case 'json':
                grammar = Prism.languages.json;
                break;
            default:
                grammar = Prism.languages.clike;
        }
        return Prism.highlight(code || '', grammar || Prism.languages.clike, language);
    };

    const lineCount = (value || '').split('\n').length;

    return (
        <div className={cn("space-y-2 flex flex-col h-full", className)}>
            <div className="flex justify-between items-center w-full select-none">
                <label className={cn("flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]", labelColorClass)}>
                    {labelIcon}
                    {label}
                </label>
                {error && (
                    <span className="text-[10px] text-red-400 font-bold bg-red-400/10 px-2.5 py-1 rounded-lg border border-red-500/10 animate-pulse">
                        {error}
                    </span>
                )}
            </div>

            <div className={cn(
                "flex-1 w-full bg-[var(--color-editor-bg)] backdrop-blur-md border rounded-2xl overflow-auto flex relative scrollbar-custom transition-all duration-300",
                error 
                    ? "border-red-500/30 focus-within:border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.05)]" 
                    : "border-border focus-within:border-primary/40 focus-within:shadow-[0_0_20px_rgba(0,210,255,0.05)]"
            )}>
                {/* Synchronized Sticky Gutter for Line Numbers */}
                {showLineNumbers && (
                    <div className="sticky left-0 bg-[var(--color-editor-gutter)] select-none text-right py-4 pr-3.5 pl-4 border-r border-border text-text-muted/30 font-mono text-[13px] leading-[1.6] z-10 shrink-0 min-w-[2.75rem]">
                        {Array.from({ length: lineCount }).map((_, i) => (
                            <div key={i}>{i + 1}</div>
                        ))}
                    </div>
                )}

                {/* Code Input & Highlighter Overlay */}
                <div className="flex-1 relative min-h-full">
                    <Editor
                        value={value || ''}
                        onValueChange={onChange}
                        highlight={highlightCode}
                        padding={16}
                        placeholder={placeholder}
                        className="font-mono text-[13px] leading-[1.6] focus:outline-none min-h-full w-full select-text text-text-main/90"
                        style={{
                            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                            fontSize: '13px',
                            lineHeight: '1.6',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
