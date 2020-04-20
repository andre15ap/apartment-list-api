/* eslint-disable no-undef */
import request from 'supertest';

import app from '../../src/app';

const getToken = async () => {
  const user = await request(app).post('/auth').send({
    email: 'emailuser@gmail.com',
    password: '123456',
  });
  const { token } = user.body;
  return { Authorization: `Bearer ${token}` };
};

describe('Users', () => {
  it('Register User', async () => {
    const response = await request(app).post('/users').send({
      name: 'Andre Assunção',
      email: 'emailuser@gmail.com',
      password: '123456',
    });

    expect(response.body).toHaveProperty('id');
  });

  it('Authenticate User', async () => {
    const response = await request(app).post('/auth').send({
      email: 'emailuser@gmail.com',
      password: '123456',
    });

    expect(response.body).toHaveProperty('token');
  });

  it('Edit User', async () => {
    const authorization = await getToken();
    const response = await request(app)
      .put('/users')
      .send({ name: 'Pedro da Silva' })
      .set(authorization);

    console.log(response.body);

    const { name } = response.body;

    expect(name).toBe('Pedro da Silva');
  });
});

describe('Blocks', () => {
  it('Create a new Block', async () => {
    const authorization = await getToken();
    const response = await request(app)
      .post('/blocks')
      .send({ identifier: '15' })
      .set(authorization);

    expect(response.body).toHaveProperty('id');
  });

  it('Edit a Block', async () => {
    const authorization = await getToken();
    const response = await request(app)
      .put('/blocks/1')
      .send({ identifier: '20' })
      .set(authorization);

    const { identifier } = response.body;

    expect(identifier).toBe('20');
  });

  it('List Blocks', async () => {
    const authorization = await getToken();
    await request(app)
      .post('/blocks')
      .send({ identifier: '30' })
      .set(authorization);
    const response = await request(app).get('/blocks').set(authorization);
    expect(response.body).toHaveLength(2);
  });

  it('Exclude a Block', async () => {
    const authorization = await getToken();
    const response = await request(app).delete('/blocks/2').set(authorization);
    const { deleted } = response.body;
    expect(deleted).toBe(1);
  });
});

describe('Dwellers', () => {
  it('Create a new Dweller', async () => {
    const authorization = await getToken();
    const response = await request(app)
      .post('/dwellers')
      .send({
        name: 'Jaqueline silva',
        birthday: '09/09/1992',
        email: 'andre_dweller6@gmail.com',
        cpf: '23540693084',
        phone: '(63) 99912-3433',
      })
      .set(authorization);

    expect(response.body).toHaveProperty('id');
  });

  it('Edit a Dweller', async () => {
    const authorization = await getToken();
    const response = await request(app)
      .put('/dwellers/1')
      .send({ name: 'Jaqueline silva sousa' })
      .set(authorization);

    const { name } = response.body;

    expect(name).toBe('Jaqueline silva sousa');
  });

  it('List Dwellers', async () => {
    const authorization = await getToken();
    await request(app)
      .post('/dwellers')
      .send({
        name: 'Francisco Aguiar',
        birthday: '02/10/1999',
        email: 'francisco@gmail.com',
        cpf: '42475302089',
        phone: '(84) 99912-5544',
      })
      .set(authorization);

    const response = await request(app).get('/dwellers').set(authorization);
    expect(response.body).toHaveLength(2);
  });

  it('Exclude a Dweller', async () => {
    const authorization = await getToken();
    const response = await request(app)
      .delete('/dwellers/2')
      .set(authorization);
    const { deleted } = response.body;
    expect(deleted).toBe(1);
  });
});

describe('Apartments', () => {
  it('Create a new Apartment', async () => {
    const authorization = await getToken();
    const response = await request(app)
      .post('/apartments')
      .send({ identifier: '308', dwellers: [1], block_id: 1 })
      .set(authorization);

    expect(response.body).toHaveProperty('id');
  });

  it('Edit a Apartment', async () => {
    const authorization = await getToken();
    const response = await request(app)
      .put('/apartments/1')
      .send({ identifier: '309' })
      .set(authorization);

    const { identifier } = response.body;

    expect(identifier).toBe('309');
  });

  it('List Apartments', async () => {
    const authorization = await getToken();

    const response = await request(app).get('/apartments').set(authorization);
    expect(response.body).toHaveLength(1);
  });

  it('Delete a Apartment', async () => {
    const authorization = await getToken();

    const response = await request(app)
      .delete('/apartments/1')
      .set(authorization);
    const { deleted } = response.body;
    expect(deleted).toBe(1);
  });
});
