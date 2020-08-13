import Server from '../modules/server'
import request from 'supertest'

const server = new Server()

test('hello works', async () => {
  server.start()
  const response = await request((await server.getApp()).callback()).get('/hello')
  expect(response.status).toBe(200)
  expect(response.body.message).toBe('funcionando')
})

test('server works', async () => {
  expect(async () => {
    await server.start()
    server.close()
  }).not.toThrow(Error)
})

afterAll(async done => {
  server.close()
  done()
})
