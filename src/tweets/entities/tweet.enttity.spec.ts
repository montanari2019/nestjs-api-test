import mongoose from 'mongoose';
import { TweetSchemaClass, TweetSchemaFactory } from './tweet.entity';
import { ConfigModule } from '@nestjs/config';

describe('Tweet Test', () => {
  describe('Test the class', () => {
    it('shout creat a tweet', () => {
      const tweet = new TweetSchemaClass({
        content: 'Hello World',
        screen_name: 'ikarobruno',
      });

      expect(tweet.content).toBe('Hello World');
      expect(tweet.screen_name).toBe('ikarobruno');
    });
  });

  describe('Test the mongoDb', () => {
    let conection: mongoose.Mongoose;

    beforeEach(async () => {
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
      });

      conection = await mongoose.connect(process.env.DATABASE_URL);
    });


    it('create a tweet document', async () => {
      const TweetModel = conection.model('tweet', TweetSchemaFactory);
      const tweet = new TweetModel({
        content: 'Hello World',
        screen_name: 'ikarobruno',
      });

      await tweet.save();

      const tweetCreated = await TweetModel.findById(tweet._id);

      expect(tweetCreated.content).toBe('Hello World');
      expect(tweetCreated.screen_name).toBe('ikarobruno');
    });


    afterEach(async () => {
      await conection.disconnect();
    });
  });
});
