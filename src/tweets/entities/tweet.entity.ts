import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TweetProps = {
  content: string;
  screen_name: string;
};

@Schema({
  collection: 'tweet',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Tweet {
  constructor(props: TweetProps) {
    Object.assign(this, props);
  }

  @Prop()
  content: string;
  @Prop()
  screen_name: string;
}


export const TweetSchema  = SchemaFactory.createForClass(Tweet)