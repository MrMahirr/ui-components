import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeToolbar } from './CodeToolbar';

// Register only the specific light-build languages
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('javascript', jsx);
SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('html', markup);
SyntaxHighlighter.registerLanguage('css', css);

interface CodeViewerProps {
    code: string;
    language: 'react' | 'html' | 'css';
}

/**
 * Reusable CodeViewer component that renders raw/processed code inside a beautiful,
 * high-contrast monospaced display. Accompanied by our advanced CodeToolbar overlay.
 * Dynamic code-highlighting is powered by react-syntax-highlighter (Prism engine).
 */
export function CodeViewer({ code, language }: CodeViewerProps) {
    const mapLanguage = (lang: 'react' | 'html' | 'css'): string => {
        switch (lang) {
            case 'react':
                return 'jsx';
            case 'html':
                return 'markup';
            case 'css':
                return 'css';
            default:
                return 'jsx';
        }
    };

    return (
        <div className="w-full h-full relative flex items-center justify-center">
            {/* Dynamic Export & Copy Toolbar */}
            <CodeToolbar code={code} language={language} />

            <div className="w-full h-full max-w-4xl p-8 pt-16 bg-surface/30 backdrop-blur-md rounded-3xl overflow-auto border border-border shadow-2xl relative select-text scrollbar-custom">
                <SyntaxHighlighter
                    language={mapLanguage(language)}
                    style={atomDark}
                    useInlineStyles={true}
                    customStyle={{
                        background: 'transparent',
                        padding: 0,
                        margin: 0,
                        fontSize: '13px',
                        lineHeight: '1.6',
                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                        overflow: 'visible',
                        width: '100%',
                    }}
                    codeTagProps={{
                        style: {
                            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                            fontSize: '13px',
                            lineHeight: '1.6',
                        }
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}