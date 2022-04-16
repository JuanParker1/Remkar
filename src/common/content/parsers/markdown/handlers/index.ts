import { Code } from './code';
import { paragraph } from './paragraph';
import { html } from './html';
export const highlighter = (params: any) => ({
  code: Code(params),
  paragraph: paragraph,
  html: html,
});
