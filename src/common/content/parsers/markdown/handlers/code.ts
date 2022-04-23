import * as Prism from 'prismjs';
import * as detab from 'detab';
import * as u from 'unist-builder';
import * as escapeHtml from 'escape-html';
import { parseThematicBlock } from './utils';

import 'prismjs/components/index';

// enable syntax highlighting on diff language
import 'prismjs/components/prism-diff';
import 'prismjs/plugins/diff-highlight/prism-diff-highlight';

const DIFF_HIGHLIGHT_SYNTAX = /^(diff)-([\w-]+)/i;

const prismHighlighter = (
  rawCode,
  language,
  { lineHighlights, fileName },
  { h, node },
) => {
  let lang = language || '';
  let grammer;

  const diffLanguage = lang.match(DIFF_HIGHLIGHT_SYNTAX);
  if (diffLanguage) {
    lang = diffLanguage[2];
    grammer = Prism.languages.diff;
  }

  lang = lang === 'vue' ? 'html' : lang;

  if (!grammer) {
    grammer = Prism.languages[lang];
  }

  const highlightLanguage = diffLanguage ? `diff-${lang}` : lang;

  let code = grammer
    ? Prism.highlight(rawCode, grammer, highlightLanguage)
    : rawCode;

  if (!lang || !grammer) {
    lang = 'text';
    code = escapeHtml(code);
  }

  const props: any = {
    className: [`language-${lang}`, 'line-numbers'],
  };

  if (lineHighlights) {
    props.dataLine = lineHighlights;
  }

  const childs = [];

  /**
   * If filename, then set span as a first child
   */
  if (fileName) {
    childs.push(
      h(node, 'span', { className: ['filename'] }, [u('text', fileName)]),
    );
  }

  /**
   * Set pre as a child
   */
  childs.push(h(node, 'pre', props, [h(node, 'code', [u('raw', code)])]));

  return h(
    node.position,
    'div',
    { className: ['nuxt-content-highlight'] },
    childs,
  );
};

const toAst = (h, node) => (highlighted) => {
  if (typeof highlighted === 'string') {
    return h(node, 'div', { className: ['nuxt-content-highlight'] }, [
      u('raw', highlighted),
    ]);
  }
  return highlighted;
};

// export const Code = (highlighter: any) => (h, node) => {
//   const lang = node.lang + ' ' + (node.meta || '');
//   const { language, lineHighlights, fileName } = parseThematicBlock(lang);
//   const code = node.value ? detab(node.value + '\n') : '';

//   if (!highlighter) {
//     return prismHighlighter(
//       code,
//       language,
//       { lineHighlights, fileName },
//       { h, node },
//     );
//   }

//   const highlightedCode = highlighter(
//     code,
//     language,
//     { lineHighlights, fileName },
//     { h, node, u },
//   );
//   return toAst(h, node)(highlightedCode);
// };

export function Code(h, node) {
  const lang = node.lang + ' ' + (node.meta || '');
  const { language, lineHighlights, fileName } = parseThematicBlock(lang);
  //  const code = node.value ? detab(node.value + '\n') : '';
  console.log('node ', node);
  return h(node, 'editor-example', {
    className: ['language'],
    lang: language,
    code: node.value,
  });
}

export function H1(h, node) {
  const value = node.children.find((nd) => nd.value);
  return h(
    node,
    'heading',
    {
      className: ['language'],
      text: value.value,
      component: 'h' + (node.depth + 2),
      style: {
        fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
      },
    },
    [value],
  );
}
