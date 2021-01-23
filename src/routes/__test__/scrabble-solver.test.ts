import request from 'supertest'
import { app } from '../../app'

it('responds with details about the scrabble solver service', async() => {
    
    const response = await request(app)
        .get('/words/hat')
        .expect(200)

    expect(response.body.words).toEqual([
        "hat",
        "ah",
        "ha",
        "th",
        "at",
        "a"
    ])
})
