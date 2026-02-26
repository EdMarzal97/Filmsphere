import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { Server } from 'http';

jest.setTimeout(15000);

describe('Movies API (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('GET / -> should return Hello World', () => {
    return request(app.getHttpServer() as Server)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('POST /movies -> should fail without JWT', () => {
    return request(app.getHttpServer() as Server)
      .post('/movies')
      .send({
        title: 'Unauthorized movie',
        description: 'Should fail',
        releaseYear: 2025,
      })
      .expect(401);
  });

  it('POST /auth/login -> should return JWT token', async () => {
    const res = await request(app.getHttpServer() as Server)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'admin',
      })
      .expect(201);

    const body = res.body as { access_token: string };
    jwtToken = body.access_token;
    expect(body.access_token).toBeDefined();
    expect(typeof body.access_token).toBe('string');
  });

  it('POST /movies -> should succeed with JWT', () => {
    return request(app.getHttpServer() as Server)
      .post('/movies')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: 'E2E Movie',
        description: 'Created in test',
        releaseYear: 2025,
      })
      .expect(201);
  });
});
