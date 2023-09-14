import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({
  toJSON: {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  },
})
export class Department extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: "Enterprise" })
  enterprise: Types.ObjectId;

  @Prop({ required: true })
  createdAt: Date;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
