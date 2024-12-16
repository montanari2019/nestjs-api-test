import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetSchemaFactory, TweetSchemaClass } from './entities/tweet.entity';

describe('TweetsService', () => {
  let service: TweetsService;
  let moduleTest: TestingModule

  beforeEach(async () => {
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    });


    moduleTest = await Test.createTestingModule({
      providers: [TweetsService],
      imports: [
        MongooseModule.forRoot(process.env.DATABASE_URL, {
          authSource: 'admin',
        }),
        MongooseModule.forFeature([
          {
            name: TweetSchemaClass.name,
            schema: TweetSchemaFactory,
          },
        ]),
      ],
    }).compile();

    service = moduleTest.get<TweetsService>(TweetsService);
  });

  afterEach(async () =>{
    await moduleTest.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a tweet', async () => {
    const tweet = await service.create({
      content: 'Hello, World!',
      screen_name: 'ikarobruno',
    });

    expect(tweet.content).toBe('Hello, World!');
    expect(tweet.screen_name).toBe('ikarobruno');
  });
});
