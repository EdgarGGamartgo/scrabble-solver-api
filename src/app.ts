import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { scrabbleSolverRouter } from './routes/scrabble-solver-router'
import { errorHandler, NotFoundError } from '@oregtickets/common'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import cors from 'cors'
import { SourceDataMiddleware } from './middlewares/load-source-data-middleware'

// Set up an express app
const app = express()

// Middleware initialization
app.use(json())
app.use(cors())
app.use(SourceDataMiddleware)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(scrabbleSolverRouter)

app.all('*', async(req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)
export { app }