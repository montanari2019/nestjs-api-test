import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';

describe('TweetController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    });

    const modulo = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = modulo.createNestApplication();
    await app.init();
  });

  it('POST / tweets', async () => {
    const res = await request(app.getHttpServer())
      .post('/tweets')
      .send({
        content: 'Hello, World! teste 2E2',
        screen_name: 'ikarobruno',
      })
      .expect(201)
      
      expect(res.body._id).toBeDefined()
      expect(res.body).toMatchObject({
        content: 'Hello, World! teste 2E2',
        screen_name: 'ikarobruno',
      })
  });

  afterEach(async () => {
    if (app) {
      app.close();
    }
  });
});
