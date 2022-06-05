import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest, * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Blog', () => {
  const user = { name: 'Teszt János', userName: 'janos', email: 'janos@test.hu', password: 'janos' };

  let app: INestApplication;
  let requestHandle: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(['error']);
    await app.init();

    requestHandle = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Authentication', () => {
    it('should register', async () => {
      await requestHandle.post('/users').send(user).expect(201);
    });

    it('should fail on same user registration', async () => {
      await requestHandle.post('/users').send(user).expect(409);
    });

    it('should login with registered user', async () => {
      await requestHandle.post('/users/login').send(user).expect(201);
    });
  });

  /*describe('BlogPost Controller', () => {
    let token: string;

    let createdPost: Record<string, unknown>;
    beforeAll(() => {
      createdPost = {
        id: 1,
        title: 'Test title',
        text: 'test test test test test',
        createdAt: null,
        modifiedAt: null,
        user: {
          id: 3,
          name: 'Admin Admin',
          role: 'ADMIN',
        },
        labels: [],
      };
    });

    beforeEach(async () => {
      const loginResponse = await requestHandle.post('/users/login').send(user);
      token = `Bearer ${loginResponse.body.access_token}`;
    });

    describe('/posts', () => {
      it('should return empty array', async () => {
        await requestHandle
          .get('/posts')
          .set('Authorization', token)
          .expect(200)
          .expect([]);
      });

      it('should create a new post', async () => {
        const response = await requestHandle
          .post('/issues')
          .set('Authorization', token)
          .send({
            title: 'Rossz oktatói gép',
            description: 'Nem kapcsol be',
            place: '2-202',
          })
          .expect(201);

        createdPost.createdAt = response.body.createdAt;
        createdPost.modifiedAt = response.body.modifiedAt;

        expect(response.body).toEqual({
          ...createdPost,
          comments: [],
        });
      });

      it('should return the newly created post in an array for the user', async () => {
        await requestHandle
          .get('/posts')
          .set('Authorization', token)
          .expect(200)
          .expect([createdPost]);
      });

      it('should not return the issue for another normal user', async () => {
        const loginResponse = await requestHandle
          .post('/users/login')
          .send({ userName: 'papi', password: 'papi' });
        const otherToken = `Bearer ${loginResponse.body.access_token}`;
        await requestHandle
          .get('/issues')
          .set('Authorization', otherToken)
          .expect(200)
          .expect([]);
      });

      it('should return the issue for an admin', async () => {
        const loginResponse = await requestHandle
          .post('/users/login')
          .send({ userName: 'admin', password: 'admin' });
        const otherToken = `Bearer ${loginResponse.body.access_token}`;
        await requestHandle
          .get('/issues')
          .set('Authorization', otherToken)
          .expect(200)
          .expect([createdIssue]);
      });
    });

    describe('/issues/:id', () => {
      it('should not return anything when user is not provided', async () => {
        await requestHandle.get('/issues/1').expect(401);
      });

      it('should return the requested issue', async () => {
        await requestHandle
          .get('/issues/1')
          .set('Authorization', token)
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual({ ...createdIssue, messages: [] });
          });
      });

      it('should return 404 when the issue does not exist', async () => {
        await requestHandle
          .get('/issues/10')
          .set('Authorization', token)
          .expect(404);
      });
    });

    describe('/issues/:id/messages', () => {
      it('should return the newly created message', async () => {
        await requestHandle
          .post('/issues/1/messages')
          .set('Authorization', token)
          .send({
            text: 'cica',
          })
          .expect(201)
          .expect((res) => {
            const userId = res.body.user.id;
            res.body.user = userId;
            expect(res.body).toEqual({
              id: 1,
              text: 'cica',
              createdAt: res.body.createdAt,
              modifiedAt: res.body.modifiedAt,
              user: 3,
            });
          });
      });
    });

    describe('/labels', () => {
      it('should return the newly created label', async () => {
        await requestHandle
          .post('/labels')
          .set('Authorization', token)
          .send({
            text: 'cica',
          })
          .expect(201)
          .expect({
            id: 1,
            text: 'cica',
          });
      });

      it('should return all the labels', async () => {
        await requestHandle
          .get('/labels')
          .set('Authorization', token)
          .expect(200)
          .expect([
            {
              id: 1,
              text: 'cica',
            },
          ]);
      });

      it('should query the labels by text', async () => {
        await requestHandle
          .get('/labels?text=alma')
          .set('Authorization', token)
          .expect(200)
          .expect([]);
      });

      it('should add the label to the issue', async () => {
        const loginResponse = await requestHandle
          .post('/users/login')
          .send({ userName: 'admin', password: 'admin' });
        const otherToken = `Bearer ${loginResponse.body.access_token}`;
        await requestHandle
          .patch('/issues/1')
          .set('Authorization', otherToken)
          .send({
            labels: [{ id: 1 }],
          })
          .expect(200);
        await requestHandle
          .get('/issues/1')
          .set('Authorization', token)
          .expect((res) => {
            expect(res.body.labels).toEqual([
              {
                id: 1,
                text: 'cica',
              },
            ]);
          });
      });
    });
  });*/
});
