import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  Markdown,
  processMarkdownOptions,
  getDefaults,
} from './common/content/parsers/index';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    const file = readFileSync(join(__dirname, '../', 'content/12345.md'));
    const markdow = file.toString();
    const options = getDefaults();
    processMarkdownOptions(options);
    const markdown = new Markdown({
      ...options.markdown,
      //tocTags: [],
    });

    return markdown.toJSON(markdow);
    //return
  }
}
