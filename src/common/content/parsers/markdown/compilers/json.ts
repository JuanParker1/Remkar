/**
 * Parses nodes for JSON structure. Attempts to drop
 * unwanted properties.
 */
function parseAsJSON(node, parent) {
  //const exist = tagName
  let i = 0;
  for (const child of parent) {
    const empty = child.value === '\n';
    if (empty) {
      parent.splice(i, 1);
    }
    i++;
  }

  /**
   * Element node creates an isolated children array to
   * allow nested elements
   */
  if (node.type === 'element') {
    const childs = [];

    /**
     * Replace a tag with nuxt-link if relative
     */
    if (node.tagName === 'a' && (node.properties.href || '').startsWith('/')) {
      node.tagName = 'nuxt-link';
      node.properties.to = node.properties.href;
      delete node.properties.href;
    }

    const filtered: any = {
      type: 'element',
      tag: node.tagName,
      props: node.properties,
      children: childs,
    };

    // Unwrap contents of the template, saving the root level inside content.
    if (node.tagName === 'template') {
      const templateContent = [];
      node.content.children.forEach((templateNode) =>
        parseAsJSON(templateNode, templateContent, d),
      );
      filtered.content = templateContent;
    }

    parent.push(filtered);

    if (node.children) {
      node.children
        .filter((child) => child.value !== '\n')
        .forEach((child) => parseAsJSON(child, childs));
    }

    return;
  }

  /**
   * Text node pushes to the parent
   */
  if (node.type === 'text') {
    parent.push({
      type: 'text',
      value: node.value,
    });
    // node.value !== '\n' && parent.push(node.value);
    return;
  }

  /**
   * Root level nodes push to the original parent
   * children and don't create a new node
   */
  if (node.type === 'root') {
    node.children.forEach((child) => parseAsJSON(child, parent));
  }
}

/**
 * JSON compiler
 */
export const jsonCompiler = function () {
  this.Compiler = function (root) {
    /**
     * We do not use `map` operation, since each node can be expanded to multiple top level
     * nodes. Instead, we need an array to fill in as many elements inside a single
     * iteration
     */
    const result = [];
    parseAsJSON(root, result);

    return {
      type: 'root',
      children: result,
    };
  };
};
