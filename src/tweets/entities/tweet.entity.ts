import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type TweetProps = {
  content: string;
  screen_name: string;
};

export type TweetDocument = HydratedDocument<TweetSchemaClass>;

@Schema({
  collection: 'tweet',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class TweetSchemaClass {
  constructor(props: TweetProps) {
    Object.assign(this, props);
  }

  @Prop()
  @ApiProperty()
  content: string;
  @Prop()
  @ApiProperty()
  screen_name: string;
}

export const TweetSchemaFactory =
  SchemaFactory.createForClass(TweetSchemaClass);
