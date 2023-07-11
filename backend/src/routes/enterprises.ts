import express from 'express'
import Enterprise from '../models/Enterprise'

const router = express.Router()

router.get('/', (_, res) => {
  Enterprise.find({}).then(enterprise => {
    res.json(enterprise)
  }).catch(() => {
    res.status(404).end()
  })
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

router.delete('/:id', (req, res, next) => {
  const { id } = req.params

  Enterprise.findByIdAndDelete(id).then(del => {
    if (del == null) return res.status(404).end()
    return res.status(204).end()
  }).catch(err => {
    next(err)
  })
})

router.post('/', (req, res, next) => {
  const data: { content: String, important: true } = req.body
  const { content, important } = data
  if (data.content === '') {
    return res.status(400).json({
      error: 'required "content" field is missing'
    })
  }
  const enterprise = new Enterprise({ content, date: new Date(), important: important ?? false })
  enterprise.save().then(savedEnterprise => {
    return res.json(savedEnterprise)
  }).catch(err => {
    next(err)
  })
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

export default router
