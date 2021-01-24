import request from 'supertest'
import { app } from '../../app'

it(`responds a success HTTP 200 OK Status code and a JSON list of strings, where each entry is a word.
They are sorted by Scrabble score, from highest to lowest scoring.`,
async() => {    
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

    const responseTwo = await request(app)
        .get('/words/code')
        .expect(200)

    expect(responseTwo.body.words).toEqual([
        "code",
        "coed",
        "deco",
        "cod",
        "dec",
        "doc",
        "cd",
        "dc",
        "co",
        "doe",
        "ode",
        "de",
        "do",
        "od"
    ])
})

it(`responds a success HTTP 200 OK Status code and a JSON list of strings, 
where the letters are like Scrabble tiles. Order is unimportant`,
async() => {    
    const responseOne = await request(app)
        .get('/words/hat')
        .expect(200)

    const responseTwo = await request(app)
        .get('/words/aht')
        .expect(200)

    expect(responseOne.body.words).toEqual([
        "hat",
        "ah",
        "ha",
        "th",
        "at",
        "a"
    ])

    expect(responseTwo.body.words).toEqual([
        "hat",
        "ah",
        "ha",
        "th",
        "at",
        "a"
    ])
})

it(`responds a success HTTP 200 OK Status code and a JSON list of strings,
where the letters are not case-sensitive.`,
async() => {    
    const responseOne = await request(app)
        .get('/words/hat')
        .expect(200)

    expect(responseOne.body.words).toEqual([
        "hat",
        "ah",
        "ha",
        "th",
        "at",
        "a"
    ])

    const responseTwo = await request(app)
        .get('/words/HAT')
        .expect(200)

    expect(responseTwo.body.words).toEqual([
        "hat",
        "ah",
        "ha",
        "th",
        "at",
        "a"
    ])

    const responseThree = await request(app)
        .get('/words/Hat')
        .expect(200)

    expect(responseThree.body.words).toEqual([
        "hat",
        "ah",
        "ha",
        "th",
        "at",
        "a"
    ])
})

it(`responds a success HTTP 200 OK Status code and a JSON empty list, where no 
dictionary words can be spelled with the given letters`,
async() => {    
    const response = await request(app)
        .get('/words/zzz')
        .expect(200)

    expect(response.body.words).toEqual([])
})

it(`responds a Not Found HTTP 404 Status code whenever requesting to a not valid route. The only valid route is
http://localhost:8080/words/:letters where :letters must be a string of arbitrary letters`,
async() => {    
    const response = await request(app)
        .get('/words/')
        .expect(404)

    expect(response.body.errors).toEqual([
        {
            message: "Not found"
        }
    ])
})

it(`responds a Not Found HTTP 404 Status code whenever requesting to a not valid route. The only valid route is
http://localhost:8080/words/:letters where :letters must be a string of arbitrary letters`,
async() => {    
    const response = await request(app)
        .get('/words/')
        .expect(404)

    expect(response.body.errors).toEqual([
        {
            message: "Not found"
        }
    ])
})

it(`responds a Bad Request HTTP 400 Status code when :letters path param does not comply with our 
validation middleware`,
async() => {    
    const response = await request(app)
        .get('/words/ h a t ')
        .expect(400)

    expect(response.body.errors).toEqual([
        {
            "message": "You must supply valid consecutive letters",
            "field": "letters"
        }
    ])

    const responseTwo = await request(app)
        .get('/words/123')
        .expect(400)

    expect(responseTwo.body.errors).toEqual([
        {
            "message": "You must supply valid consecutive letters",
            "field": "letters"
        }
    ])
})