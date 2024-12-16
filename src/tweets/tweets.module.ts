import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetSchemaClass, TweetSchemaFactory } from './entities/tweet.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: TweetSchemaClass.name,
      schema: TweetSchemaFactory,
    },
  ]),],
  exports: [TweetsService],
  controllers: [TweetsController],
  providers: [TweetsService],
})
export class TweetsModule {}
