import express, { Response, Request } from 'express'
import { BadRequestError, validateRequest } from '@oregtickets/common'
import { param } from 'express-validator'
import { ReturnAnagrams } from './../services/anagram-solver'

const router = express.Router()

router.get('/words/:letters', [
    param('letters')
        .trim()
        .notEmpty()
        .isAlpha()
        .withMessage('You must supply valid letters')
],
validateRequest, (req: Request, res: Response) => {
        const { letters } = req.params
        const words = ReturnAnagrams(letters, req.words!).anagrams
        return res.status(200).send({ words })
})

export  { router as scrabbleSolver }