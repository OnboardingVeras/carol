import Koa from 'koa'
import mongoose from 'mongoose'
import Router from 'koa-router'
import getPort from 'get-port'
import asyncRetry from 'async-retry'
import hello from './handlers/hello'
import info from './handlers/info'
// eslint-disable-next-line no-unused-vars
import { Server } from 'http'
const dotenv = require('dotenv')
dotenv.config()
class WebServer {
  private app: Koa
  private router: Router
  private port: number
  private server: Server
  private mongoUrl: string = `mongodb+srv://carolestrella:${process.env.PASSWORD}@cluster0.1inby.mongodb.net/noderest?retryWrites=true&w=majority`

  constructor () {
    this.app = new Koa()
    this.router = new Router()
    this.mongoSetup()
  }

  private async mongoSetup (): Promise<void> {
    try {
      await mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
      console.log('Successfully connected to mongodb')
    } catch (error) {
      console.debug(`Failed to connect database. Reason: ${error.message}`)
    }
  }

  public async dropDatabase () : Promise<void> {
    await mongoose.connection.dropDatabase()
    console.log('Successfully dropped database')
  }

  public async closeConnection () : Promise<void> {
    await mongoose.connection.close()
    console.log('Successfully disconnected to mongodb')
  }

  public async getPort () {
    return this.port
  }

  public async getApp () {
    return this.app
  }

  private async setPort () {
    const port = await getPort({
      port: getPort.makeRange(3000, 3050)
    })

    this.port = port
  }

  private async setRoutes () {
    this.router.get('/hello', hello)
    this.router.get('/info', info)
  }

  public async start () {
    await asyncRetry(async bail => {
      try {
        await this.setPort()
        await this.setRoutes()
        this.app.use(this.router.routes())

        this.server = this.app.listen(this.port, async () => {
          console.debug(`Server listening on port: ${this.port}`)
        }).on('error', (err) => {
          console.error(err)
        })

        return this.server
      } catch (error) {
        console.debug(`Server failed to start on port:${this.port}. Reason: ${error.message}.`)
        if (error.code !== 'EADDRINUSE') {
          return bail(error)
        }
      }
    }, {
      retires: 2, maxTimeout: 50, minTimeout: 50
    })
  }

  public close () {
    this.server.close()
  }
}

export default WebServer
