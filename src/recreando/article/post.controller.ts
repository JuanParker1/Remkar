import { Controller } from '@nestjs/common';
import { Article, ArticleDocument } from './schema/article.schema';
import { Crud, defaultPaginate } from 'nestjs-mongoose-crud';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ArticleService } from './article.service';

@Crud({
    model: Article,
})
@Controller('article')
export class PostController {
    crudOptions = {};
    model: ModelType<ArticleDocument>;
    constructor(public service: ArticleService) {
        this.model = service.model;
    }
}
