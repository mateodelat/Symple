import { Request, Response, NextFunction } from "express"

const handleErrors = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  if (err.name === 'CastError') res.status(400).send({ error: 'malformed id' })
  res.status(500).end()
}

export default handleErrors
