import { ENTERPRISE } from "@/constants/Entities";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({
  toJSON: {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.password;
    },
  },
})
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({
    required: false,
    type: String,
    default: "",
  })
  avatar: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop({
    required: false,
    type: [{ type: Types.ObjectId, ref: ENTERPRISE }],
    default: [],
  })
  enterprises: Types.ObjectId[];

  @Prop({ required: true })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
