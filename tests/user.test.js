const request = require('supertest');
const app = require('../index'); // Ajuste conforme necessário
const sequelize = require('../config/config');
const User = require('../models/User');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('User API', () => {
it('should register a user', async () => {
const response = await request(app)
.post('/api/users/register')
.send({ username: 'testuser', password: 'password' });

expect(response.status).toBe(201);
expect(response.body).toHaveProperty('username', 'testuser');
});

it('should login a user', async () => {
const response = await request(app)
.post('/api/users/login')
.send({ username: 'testuser', password: 'password' });

expect(response.status).toBe(200);
expect(response.body).toHaveProperty('message', 'Login successful');
});

it('should list users', async () => {
const response = await request(app)
.get('/api/users/list');

expect(response.status).toBe(200);
expect(response.body).toHaveLength(1);
});
});
