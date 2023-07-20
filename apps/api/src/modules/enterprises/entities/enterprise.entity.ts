import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { User } from '@modules/users/entities/user.entity'
import mongoose, { Document } from 'mongoose'

@Schema({
  toJSON: {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
    }
  }
})
export class Enterprise extends Document {
  @Prop({ required: true })
    name: string

  @Prop()
    image: string

  @Prop({ required: true })
    turn: string

  @Prop({ required: true })
    telephone: string

  @Prop({ required: true })
    address: string

  @Prop({ required: true })
    amountOfEmployees: string

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
    admins: string[]

  @Prop({ required: true })
    createdAt: Date
}

export const EnterpriseSchema = SchemaFactory.createForClass(Enterprise)
