import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
  toJSON: {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  },
})
export class Upload extends Document {
  @Prop({ required: true })
  originalName: string;

  @Prop()
  mimeType: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  purpose: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
