import { Test, TestingModule } from '@nestjs/testing';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { ConfigModule } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import {
  TweetDocument,
  TweetSchemaClass,
  TweetSchemaFactory,
} from './entities/tweet.entity';
import { Model } from 'mongoose';

describe('TweetsController', () => {
  let controller: TweetsController;
  let mockTweetModel: Model<TweetDocument>;

  beforeEach(async () => {
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    });

    mockTweetModel = {} as Model<TweetDocument>;

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.DATABASE_URL, {
          authSource: 'admin',
        }),
        MongooseModule.forFeature([
          {
            name: getModelToken(TweetSchemaClass.name),
            schema: TweetSchemaFactory,
          },
        ]),
      ],
      controllers: [TweetsController],
      providers: [
        TweetsService,
        {
          provide: TweetSchemaClass.name,
          useClass: mockTweetModel,
        },
      ],
    }).compile();

    controller = module.get<TweetsController>(TweetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
