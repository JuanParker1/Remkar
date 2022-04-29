import { Document, Schema as SchemaMongose, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { number } from '@hapi/joi';

@Schema({
  collection: 'article',
  timestamps: true,
})
export class Article extends Document {
  @Prop({ type: String })
  title: string;
}

export type ArticleDocument = Article & Document;

export const ArticleSchema = SchemaFactory.createForClass(Article);
