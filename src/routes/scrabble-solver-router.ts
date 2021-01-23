import express, { Response, Request } from 'express'
import { BadRequestError, validateRequest } from '@oregtickets/common'
import { param } from 'express-validator'
import { AnagramSolverService } from '../services/anagram-solver-service'

const router = express.Router()

/**
 * 
 * scrabbleSolverRouter.
 * 
 * @remarks
 * This is our scrabbleSolverRouter router which purpose is to respond to a URL of the pattern
 * http://localhost:8080/words/<letters>, where <letters> is a string of arbitrary letters. 
 * 
 * @returns a JSON list of strings for a successful response and
 * a string for a failed response.
 * 
 */
router.get('/words/:letters',
// Middleware validation for letters params.
[
    param('letters')
        .trim()
        .notEmpty()
        .isAlpha()
        .withMessage('You must supply valid letters')
],
// Middleware to homogenize responses for a failed response
validateRequest,
(req: Request, res: Response) => {
        const { letters } = req.params
        const words = AnagramSolverService(letters, req.words!)
        if (words.length >= 0) {
                return res.status(200).send({ words })
        }
        throw new BadRequestError('Error retrieving scrabble words.')
})

export  { router as scrabbleSolverRouter }