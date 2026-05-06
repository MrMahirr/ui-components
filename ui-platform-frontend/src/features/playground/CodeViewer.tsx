import { CodeToolbar } from './CodeToolbar';

interface CodeViewerProps {
    code: string;
    language: 'react' | 'html' | 'css';
}

/**
 * Reusable CodeViewer component that renders raw/processed code inside a beautiful,
 * high-contrast monospaced display. Accompanied by our advanced CodeToolbar overlay.
 */
export function CodeViewer({ code, language }: CodeViewerProps) {
    const codeColorMap: Record<string, string> = {
        react: 'text-primary',
        html: 'text-green-400',
        css: 'text-amber-400',
    };

    return (
        <div className="w-full h-full relative flex items-center justify-center">
            {/* Dynamic Export & Copy Toolbar */}
            <CodeToolbar code={code} language={language} />

            <pre className="w-full h-full max-w-4xl p-8 pt-16 bg-surface/30 backdrop-blur-md rounded-3xl overflow-auto text-xs font-mono border border-border shadow-2xl relative select-text">
                <code className={codeColorMap[language] || 'text-text-main'}>
                    {code}
                </code>
            </pre>
        </div>
    );
}