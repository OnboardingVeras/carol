import Koa from 'koa'
import Router from 'koa-router'
import getPort from 'get-port'
import asyncRetry from 'async-retry'
import hello from './handlers/hello'

class Server {
  private app: Koa
  private router: Router
  private port: number

  constructor () {
    this.app = new Koa()
    this.router = new Router()
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
  }

  public async start () {
    await asyncRetry(async bail => {
      try {
        await this.setPort()
        await this.setRoutes()
        this.app.use(this.router.routes())

        const server = this.app.listen(this.port, async () => {
          console.log(`Server listening on port: ${this.port}`)
        }).on('error', (err) => {
          console.error(err)
        })

        return server
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
}

export default Server
