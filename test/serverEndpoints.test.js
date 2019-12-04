/* eslint-disable no-undef */
const supertest = require('supertest');
const server = require('../server/server.js');
const db = require('../server/database.js');

const request = supertest(server);

beforeAll(async () => {
  await db.initialize();
  await require('../server/seedDatabase.js'); // eslint-disable-line
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('GET /api/:id', () => {
  test('successfully respond with the restaurantInfo object for a valid restaurant id', async () => {
    const res = await request.get('/api/1');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('min');
    expect(res.body).toHaveProperty('max');
    expect(res.body).toHaveProperty('open');
    expect(res.body).toHaveProperty('close');
    expect(res.body).toHaveProperty('dates');
    expect(Array.isArray(res.body.dates)).toBe(true);
    expect(res.statusCode).toBe(200);
  });

  test('respond with an error code 500 for an invalid restaurant id', async () => {
    const res = await request.get('/api/0');
    expect(res.statusCode).toBe(500);
  });
});


describe('GET /api/:id/search', () => {
  test('successfully respond with array of table objects for a valid restaurant id', async () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;

    const queryParams = `?date=${today}&time=12:00:00&people=4`;
    const res = await request.get(`/api/1/search${queryParams}`);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('date');
    expect(res.body[0]).toHaveProperty('time');
    expect(res.body[0]).toHaveProperty('isOpen');

    expect(res.statusCode).toBe(200);
  });

  test('successfully respond with empty array for a day with no tables', async () => {
    const badDate = '1900-01-01';
    const queryParams = `?date=${badDate}&time=12:00:00&people=4`;
    const res = await request.get(`/api/1/search${queryParams}`);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);

    expect(res.statusCode).toBe(200);
  });

  test('respond with an error code 500 for an invalid restaurant id', async () => {
    const res = await request.get('/api/0/search');
    expect(res.statusCode).toBe(500);
  });
});


describe('POST /api/:id/reservation', () => {
  test('successfully respond with the table object for a valid restaurant id and table', async () => {
    const res = await request.post('/api/1/reservation')
      .send({ table: 1 });

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('date');
    expect(res.body).toHaveProperty('time');
    expect(res.body).toHaveProperty('isOpen');

    expect(res.body.isOpen).toBe(false);

    expect(res.statusCode).toBe(200);
  });

  test('respond with an error code 500 for an invalid restaurant id', async () => {
    const res = await request.post('/api/0/reservation');
    expect(res.statusCode).toBe(500);
  });

  test('respond with an error code 500 for an invalid table id', async () => {
    const res = await request.post('/api/1/reservation')
      .send({ table: 0 });

    expect(res.statusCode).toBe(500);
  });
});
