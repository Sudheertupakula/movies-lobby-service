import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('MovieLoController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Get Token
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'sudheer@gmail.com', password: 'Root@123' });
    accessToken = response.body['data']['accessToken'];
  });

  it('Fetch All Movies', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
});
