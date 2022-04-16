import * as handlers from 'mdast-util-to-hast/lib/handlers';
import all from 'mdast-util-to-hast/lib/all';
import htmlTags from 'html-tags';
import { paramCase } from 'change-case';
import { getTagName } from './utils';

export function paragraph(h, node) {
  if (node.children && node.children[0] && node.children[0].type === 'html') {
    const tagName = paramCase(getTagName(node.children[0].value));
    // Unwrap if component
    if (!htmlTags.includes(tagName as any)) {
      return all(h, node);
    }
  }
  return handlers.paragraph(h, node);
}
