import mongoose from 'mongoose'
const { Schema, model } = mongoose

const enterpriseSchema = new Schema({
  name: { type: String },
  image: String,
  turn: { type: String },
  telephone: { type: String },
  address: { type: String },
  amountOfEmployees: {
    type: String,
    enum: ['1-10', '11-25', '25-50', '50+'],
    required: true
  },
  date: Date
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
