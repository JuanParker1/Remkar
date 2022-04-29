import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './schema/article.schema';
import { ModelType } from '@typegoose/typegoose/lib/types';
@Injectable()
export class ArticleService {
    crudOptions = {};
    constructor(
        @InjectModel(Article.name) public model: ModelType<ArticleDocument>,
    ) { }
}
