import express from 'express'
import Enterprise from '../models/Enterprise'
import { toNewEnterprise } from '../utils/index'
const router = express.Router()

router.get('/', async (_, res) => {
  const enterprises = await Enterprise.find({})
  res.json(enterprises)
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params

  Enterprise.findById(id)
    .then(enterprise => {
      if (enterprise != null) res.json(enterprise)
      res.status(404).end()
    }).catch(err => {
      next(err)
    })
})

router.post('/', async (req, res, _next) => {
  try {
    const newEnterprise = toNewEnterprise(req.body)
    console.log(newEnterprise)
    // const enterprise = new Enterprise({ ...newEnterprise, date: new Date() })
    // const savedEnterprise = await enterprise.save()
    // res.json(savedEnterprise)
  } catch (e) {
    console.log(e)
    // const errorResponse = { error: (e as Error).message }
    res.status(400).send(e)
  }
})

router.put('/:id', (req, res, next) => {
  const { id } = req.params
  const enterprise = req.body

  Enterprise.findByIdAndUpdate(id, enterprise, { new: true }).then(updatedEnterprise => {
    res.json(updatedEnterprise)
  }).catch(err => {
    next(err)
  })
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params

  Enterprise.findByIdAndDelete(id).then(del => {
    if (del == null) return res.status(404).end()
    return res.status(204).end()
  }).catch(err => {
    next(err)
  })
})

export default router
