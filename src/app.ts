import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { scrabbleSolver } from './routes/scrabble-solver'
import { errorHandler, NotFoundError } from '@oregtickets/common'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import cors from 'cors'
import { SourceData } from './middlewares/load-source-data'

const app = express()


app.use(json())
app.use(cors())
app.use(SourceData)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(scrabbleSolver)

app.all('*', async(req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)
export { app }