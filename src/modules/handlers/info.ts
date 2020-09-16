// eslint-disable-next-line no-unused-vars
import Koa from 'koa'
import * as mongoose from 'mongoose'
import { UserSchema } from '../../models/user'

const User = mongoose.model('User', UserSchema)

async function createUsers () {
  await User.create({
    name: 'Carolina Estrella',
    email: 'carolina@host.com.br'
  })
}

async function getUsers () {
  return User.find()
}

async function info (ctx: Koa.Context) : Promise<void> {
  await createUsers()
  ctx.body = await getUsers()
}

export default info
