import { Code, H1 } from './code';
import { paragraph } from './paragraph';
import { html } from './html';
export const highlighter = (params: any) => {
  return {
    code: Code,
    paragraph: paragraph,
    heading: H1,
    html: html,
  };
};
