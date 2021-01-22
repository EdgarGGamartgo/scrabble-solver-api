import { Request, Response, NextFunction } from 'express'
import { GetDataSource } from './../services/get-data-source'
import { BadRequestError } from '@oregtickets/common'

declare global {
    namespace Express {
        interface Request {
            words?: String[]
        }
    }
}

export const SourceData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.words) {
        try {
            const data: String[] = await GetDataSource()
            if (!data || data.length === 0) {
                 throw new BadRequestError('Data source could not be retrieved.')
             }
             req.words = data 
        } catch (e) {
            console.log('Middleware load-source-data has failed: ', e)
        }
    }
    next()
}