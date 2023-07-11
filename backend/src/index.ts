import * as Sentry from '@sentry/node'
import express from 'express'
import cors from 'cors'
import enterpriseRouter from './routes/enterprises'
import logger from './middlewares/logger'
import notFound from './middlewares/notFound'
import handleErrors from './middlewares/handleErrors'
import './database/mongo'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

Sentry.init({
  dsn: 'https://01f759a9e3ab4691a7096cc0b24e482b@o4505486909177856.ingest.sentry.io/4505486911668224',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations()
  ],

  tracesSampleRate: 1.0
})

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.use(cors())
app.use(express.json())

app.use(logger)

app.get('/', (_, res) => {
  res.send('<h1>Hello World</h1>')
})

app.use('/api/enterprises', enterpriseRouter)

app.use(notFound)
app.use(Sentry.Handlers.errorHandler())
app.use(handleErrors)

const { PORT, PORT_TEST, NODE_ENV } = process.env
const port = NODE_ENV === 'test' ? PORT_TEST : PORT

const server = app.listen(port, () => {
  console.log(`Server running on port ${port ?? 3001}`)
})

export { app, server }
