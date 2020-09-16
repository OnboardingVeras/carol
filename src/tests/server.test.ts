import Server from '../modules/server'
import request from 'supertest'

const server = new Server()

beforeAll(async () => {
  await server.start()
})

test('test get method with /hello', async () => {
  const response = await request((await server.getApp()).callback()).get('/hello')
  expect(response.status).toBe(200)
  expect(response.body.message).toBe('funcionando')
})

afterAll(async done => {
  await server.close()
  done()
})
