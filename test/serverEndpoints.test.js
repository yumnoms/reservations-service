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
