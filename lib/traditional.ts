import OpenCC from 'opencc-js';
let converter: ((text: string) => string) | undefined;
export function toTraditional(text: string) {
  converter ??= OpenCC.Converter({ from: 'cn', to: 'tw' });
  return converter(text);
}
// Convert prose nodes only. Code, URLs, Markdown syntax and reference IDs stay intact.
export function traditionalMarkdown() {
  return (tree: any) => {
    const visit = (node: any) => {
      if (node.type === 'text') node.value = toTraditional(node.value);
      if (node.type === 'image' && node.alt) node.alt = toTraditional(node.alt);
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
