import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UploadsController } from "./uploads.controller";
import { UploadsService } from "./uploads.service";
import { UploadSchema, Upload } from "./upload.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Upload.name,
        schema: UploadSchema,
      },
    ]),
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
