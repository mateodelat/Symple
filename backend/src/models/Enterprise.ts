import mongoose from 'mongoose'
const { Schema, model } = mongoose

const enterpriseSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
})

enterpriseSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Enterprise = model('Enterprise', enterpriseSchema)

export default Enterprise
