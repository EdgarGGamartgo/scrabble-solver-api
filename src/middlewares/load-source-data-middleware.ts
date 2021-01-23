import { Request, Response, NextFunction } from 'express'
import { GetDataSourceService } from '../services/get-data-source-service'
import { BadRequestError } from '@oregtickets/common'

// Making 'words' available inside 'req' object globally
declare global {
    namespace Express {
        interface Request {
            words?: String[]
        }
    }
}

/**
 * SourceDataMiddleware.
 *
 * @remarks
 * This is our SourceDataMiddleware middleware which purpose is to make our dictionary of words 
 * available inside our routers
 * 
 */
export const SourceDataMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.words) {
        try {
            const data: String[] = await GetDataSourceService()
            if (!data || data.length === 0) {
                 throw new BadRequestError('Dictionary of words is not defined.')
             }
             req.words = data 
        } catch (e) {
            console.log('Middleware load-source-data has failed: ', e)
            throw new BadRequestError('Data source could not be retrieved.')
        }
    }
    next()
}