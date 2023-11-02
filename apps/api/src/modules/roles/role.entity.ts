import { DEPARTMENT } from "@/constants/Entities";
import { type Deliverable, type Indicator, type IFunction } from "@/types/models/Role";
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

export class Role extends Document {
  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: DEPARTMENT }] })
  department: Types.ObjectId;
  
  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true })
  indicators: Indicator[];

  @Prop({ required: true })
  deliverables: Deliverable[];

  @Prop({ required: true })
  functions: IFunction[];

  @Prop({ required: true })
  createdAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
