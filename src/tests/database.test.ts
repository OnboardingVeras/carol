import * as mongoose from 'mongoose'
import request from 'supertest'
import Server from '../modules/server'
import { UserSchema } from '../models/user'

jest.setTimeout(30000)

const server = new Server()
const User = mongoose.model('User', UserSchema)

beforeAll(async () => {
  await server.start()
})

test('create user', async () => {
  await request((await server.getApp()).callback()).get('/info')
  const user = await User.findOne({ name: 'Carolina Estrella' })
  expect(user).toBeTruthy()
})

afterAll(async done => {
  await server.close()
  await server.dropDatabase()
  await server.closeConnection()
  done()
})
