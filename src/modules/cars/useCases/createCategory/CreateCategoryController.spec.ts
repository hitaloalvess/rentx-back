import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import CreateConnection from '@shared/infra/typeorm/index';

let connection: Connection;

describe('Create Category Controller', () => {
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

  it('should be able to create a new category', async () => {
    const responseCreateToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { token } = responseCreateToken.body;

    const responseCreateCategory = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseCreateCategory.status).toBe(201);
  });

  it('should not be able to create new category with name exists', async () => {
    const responseCreateToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { token } = responseCreateToken.body;

    const responseCreateCategory = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseCreateCategory.status).toBe(400);
  });
});
