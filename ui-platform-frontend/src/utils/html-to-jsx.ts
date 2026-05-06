/**
 * Parses style string (e.g., "background-color: #fff; padding-top: 10px") 
 * and converts it into a React-compliant CamelCase style object string.
 */
function parseStyleString(styleStr: string): string {
    const rules = styleStr.split(';').filter(r => r.trim());
    const objProps = rules.map(rule => {
        const separatorIdx = rule.indexOf(':');
        if (separatorIdx === -1) return '';
        
        const key = rule.substring(0, separatorIdx).trim();
        const value = rule.substring(separatorIdx + 1).trim();
        
        // Convert CSS property kebab-case to camelCase (e.g. background-color -> backgroundColor)
        const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        
        // Clean and escape double quotes
        const escapedValue = value.replace(/"/g, '\\"');
        return `${camelKey}: "${escapedValue}"`;
    }).filter(Boolean).join(', ');

    return `style={{ ${objProps} }}`;
}

/**
 * Robust HTML-to-React/JSX compiler utility.
 * Parses raw HTML strings into a memory-mapped DOM tree using browser DOMParser,
 * recursively traverses the nodes, remaps incompatible attributes to JSX-compliant versions,
 * converts inline style strings to dynamic React style objects, and outputs formatted JSX.
 * Optionally wraps the resulting JSX component with custom layouts, custom typography and neon glows.
 */
export function htmlToJsx(
    htmlString: string, 
    componentName: string, 
    mode: 'tailwind' | 'css',
    globalStyles?: {
        paddingX: number;
        paddingY: number;
        borderRadius: string;
        borderWidth: number;
        borderColor: string;
        opacity: number;
        fontSize: number;
        fontWeight: string;
        letterSpacing: string;
        glowColor: string;
        glowBlur: number;
        glowSpread: number;
    } | null,
    selectedFont?: string | null
): string {
    if (!htmlString) return '';

    // 1. Initialize DOMParser and process the HTML string in-memory
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const body = doc.body;

    const attributeMap: Record<string, string> = {
        class: 'className',
        for: 'htmlFor',
        tabindex: 'tabIndex',
        readonly: 'readOnly',
        autofocus: 'autoFocus',
        autocomplete: 'autoComplete',
        maxlength: 'maxLength',
        onclick: 'onClick',
        onchange: 'onChange',
        onkeydown: 'onKeyDown',
        colspan: 'colSpan',
        rowspan: 'rowSpan',
    };

    const selfClosingTags = new Set(['img', 'input', 'br', 'hr', 'meta', 'link', 'source', 'area']);

    // 2. Recursive DOM Tree walker to generate clean JSX
    function walk(node: Node, indentLevel: number): string {
        const indent = '  '.repeat(indentLevel);

        // Text nodes
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || '';
            // If it's pure whitespace, just ignore it, but keep inline spacing safe
            if (!text.trim() && !text.includes(' ')) return '';
            
            // Escape curly braces inside text nodes to avoid JSX parsing bugs
            return text.replace(/{/g, '{"{"}').replace(/}/g, '{"}"}');
        }

        // Element nodes
        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const tagName = element.tagName.toLowerCase();

            // Resolve attributes list
            const attributes: string[] = [];
            
            Array.from(element.attributes).forEach((attr) => {
                const name = attr.name.toLowerCase();
                const value = attr.value;

                // Handle inline style attributes conversion
                if (name === 'style') {
                    attributes.push(parseStyleString(value));
                    return;
                }

                // If mode is plain CSS, strip full classes and assign base class fallback slug name
                if (name === 'class' && mode === 'css') {
                    attributes.push(`className="ui-component"`);
                    return;
                }

                // Map invalid HTML attributes to valid JSX keys
                const jsxKey = attributeMap[name] || attr.name;

                // Handle boolean attributes (e.g. "disabled", "required")
                if (value === '' || value === 'true') {
                    attributes.push(jsxKey);
                } else {
                    attributes.push(`${jsxKey}="${value.replace(/"/g, '\\"')}"`);
                }
            });

            const attributesStr = attributes.length > 0 ? ` ${attributes.join(' ')}` : '';

            // Render Self-closing tags
            if (selfClosingTags.has(tagName)) {
                return `${indent}<${tagName}${attributesStr} />`;
            }

            // Render children recursively
            const children: string[] = [];
            node.childNodes.forEach((child) => {
                const compiledChild = walk(child, indentLevel + 1);
                if (compiledChild) {
                    children.push(compiledChild);
                }
            });

            const hasOnlySingleTextChild = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

            if (hasOnlySingleTextChild) {
                const textVal = (node.childNodes[0].textContent || '').trim().replace(/{/g, '{"{"}').replace(/}/g, '{"}"}');
                return `${indent}<${tagName}${attributesStr}>${textVal}</${tagName}>`;
            }

            if (children.length === 0) {
                return `${indent}<${tagName}${attributesStr}></${tagName}>`;
            }

            return `${indent}<${tagName}${attributesStr}>\n${children.join('\n')}\n${indent}</${tagName}>`;
        }

        return '';
    }

    // 3. Compile children of document.body
    const jsxOutput: string[] = [];
    body.childNodes.forEach((child) => {
        const compiled = walk(child, 3); // Indented 3 levels to fit inside wrapper div
        if (compiled) {
            jsxOutput.push(compiled);
        }
    });

    // 4. Construct inline React styles for the outer component wrapper
    let wrapperPropsStr = '';
    if (globalStyles) {
        const rules: string[] = [];
        
        // Add padding rules
        rules.push(`padding: "${globalStyles.paddingY}px ${globalStyles.paddingX}px"`);
        
        // Add border rules
        if (globalStyles.borderWidth > 0) {
            rules.push(`border: "${globalStyles.borderWidth}px solid ${globalStyles.borderColor}"`);
        }
        
        // Add border-radius rules
        if (globalStyles.borderRadius && globalStyles.borderRadius !== '0px') {
            rules.push(`borderRadius: "${globalStyles.borderRadius}"`);
        }
        
        // Add opacity rules
        if (globalStyles.opacity !== 100) {
            rules.push(`opacity: ${globalStyles.opacity / 100}`);
        }
        
        // Add font-size rules
        if (globalStyles.fontSize && globalStyles.fontSize !== 14) {
            rules.push(`fontSize: "${globalStyles.fontSize}px"`);
        }
        
        // Add font-weight rules
        if (globalStyles.fontWeight && globalStyles.fontWeight !== '400') {
            rules.push(`fontWeight: "${globalStyles.fontWeight}"`);
        }
        
        // Add letter-spacing rules
        if (globalStyles.letterSpacing && globalStyles.letterSpacing !== 'normal') {
            const spacingValue = 
                globalStyles.letterSpacing === 'tighter' ? '-0.05em' :
                globalStyles.letterSpacing === 'tight' ? '-0.025em' :
                globalStyles.letterSpacing === 'wide' ? '0.025em' :
                globalStyles.letterSpacing === 'wider' ? '0.05em' :
                globalStyles.letterSpacing === 'widest' ? '0.1em' : '0em';
            rules.push(`letterSpacing: "${spacingValue}"`);
        }
        
        // Add google font-family rules
        if (selectedFont && selectedFont !== 'Inter') {
            rules.push(`fontFamily: "'${selectedFont}', sans-serif"`);
        }
        
        // Add neon glow box-shadow rules
        if (globalStyles.glowBlur > 0) {
            rules.push(`boxShadow: "0 0 ${globalStyles.glowBlur}px ${globalStyles.glowSpread}px ${globalStyles.glowColor}"`);
        }

        if (rules.length > 0) {
            wrapperPropsStr = ` style={{ ${rules.join(', ')} }}`;
        }
    }

    // Embed children inside the styled container or render naked elements based on active styles
    const jsxBlock = wrapperPropsStr
        ? `    <div className="ui-component-wrapper"${wrapperPropsStr}>\n${jsxOutput.join('\n')}\n    </div>`
        : jsxOutput.join('\n').replace(/^  /gm, ''); // Strip outer indentation offset if naked

    const safeCompName = componentName.replace(/[^a-zA-Z0-9]/g, '').replace(/^[a-z]/, (m) => m.toUpperCase()) || 'MyComponent';
    const cssImport = mode === 'css' ? `import './${safeCompName}.css';\n\n` : '';

    return `import React from 'react';\n\n${cssImport}export function ${safeCompName}() {\n  return (\n${jsxBlock}\n  );\n}\n`;
}
