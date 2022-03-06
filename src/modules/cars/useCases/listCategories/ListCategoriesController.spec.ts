import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import CreateConnection from '@shared/infra/typeorm/index';

let connection: Connection;

describe('List Categories Controller', () => {
  beforeAll(async () => {
    connection = await CreateConnection();
    await connection.runMigrations();
    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com', '${password}', true, now(), 'ABC-1234')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all categories', async () => {
    const responseCreateToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { token } = responseCreateToken.body;
    await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const responseListCategories = await request(app).get('/categories');

    expect(responseListCategories.status).toBe(200);
    expect(responseListCategories.body.length).toBe(1);
    expect(responseListCategories.body[0]).toHaveProperty('id');
    expect(responseListCategories.body[0].name).toEqual('Category Supertest');
  });
});
