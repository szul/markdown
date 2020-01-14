/**
 * @module strangelooprun/markdown
 */

export function toHTML(src: string): string {
    let html = '';
    function escape(text: string): string {
        return new Option(text).innerHTML;
    }
    function inlineEscape(str: string): string {
        return str.replace(/!\[([^\]]*)]\(([^(]+)\)/g, '<img alt="$1" src="$2" />')
            .replace(/\[([^\]]+)]\(([^(]+)\)/g, ('$1').link('$2'))
            .replace(/`([^`]+)`/g, (match, p1) => {
                return `<code>${ escape(p1) }</code>`;
            })
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([^*]+)\*/g, '<em>$1</em>')
            .replace(/ {2}\n/g, '<br />');
    }
    function processWrappedMarkdown(prependType: string[], line: string): string {
        return prependType[1] + ('\n' + line)
            .split(prependType[0])
            .slice(1)
            .map(prependType[3] ? escape : inlineEscape)
            .join(prependType[3] || '</li>\n<li>') + prependType[2];
    }
    function processSemanticMarkdown(char: any, line: string): string {
        return (char == '#')
            ? ('<h' + (char = line.indexOf(' ')) + '>' + inlineEscape(line.slice(char + 1)) + '</h' + char + '>')
            : (char == '<' ? line : '<p>' + inlineEscape(line) + '</p>');
    }
    src.replace(/&gt;/g, '>').replace(/^\s+|\r|\s+$/g, '').replace(/\t/g, '    ').split(/\n\n+/).forEach((line: string): void => {
        const char = line[0];
        const prependType = {
            '*': [/\n\* /, '<ul><li>', '</li></ul>'],
            '1': [/\n[1-9]\d*\.? /, '<ol><li>', '</li></ol>'],
            ' ': [/\n {4}/, '<pre><code>', '</pre></code>', '\n'],
            '>': [/\n> /, '<blockquote>', '</blockquote>', '\n'],
        }[char];
        html += prependType ? processWrappedMarkdown(prependType, line) : processSemanticMarkdown(char, line);
    });
    return html;
}
