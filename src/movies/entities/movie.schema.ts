import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  genre: string[];

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  streaminLink: string;

  @Prop({ required: false })
  actors: string[];

  @Prop({ required: false })
  directors: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
