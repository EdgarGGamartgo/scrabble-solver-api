import request from 'supertest'
import { app } from '../../app'

it('responds with details about the scrabble solver service', async() => {
    
    const response = await request(app)
        .get('/words/hola')
        .expect(200)

    expect(response.body.letters).toEqual('hola')
})
