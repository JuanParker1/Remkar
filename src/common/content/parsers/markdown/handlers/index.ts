import { Code } from './code';
import { paragraph } from './paragraph';
import { html } from './html';
export const highlighter = (params: any) => ({
  code: Code,
  paragraph: paragraph,
  html: html,
});
