import { Request, Response, NextFunction } from 'express'

const logger = (req: Request, _: Response, next: NextFunction): undefined => {
  console.log({ method: req.method })
  console.log({ path: req.path })
  console.log({ body: req.body })
  console.log('-------')
  next()
}

export default logger
