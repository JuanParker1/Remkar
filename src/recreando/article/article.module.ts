import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { ArticleService } from './article.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './schema/article.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [PostController],
  providers: [ArticleService],
})
export class ArticleModule { }
