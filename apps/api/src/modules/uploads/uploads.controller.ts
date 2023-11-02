import {
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors,
  Body,
  UploadedFile,
} from "@nestjs/common";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadsService } from "./uploads.service";
import { type UploadFileDTO } from "@/types/models/Upload";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";

@Controller("uploads")
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (_req, file, callback) => {
          // const uniqueSufix = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname);
          callback(null, `${uuidv4()}${ext}`);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^(image\/jpeg|image\/png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 2,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Body() body: UploadFileDTO,
  ): any {
    return this.uploadsService.upload(body, file);
  }

  @Get(":imgpath")
  async getFile(
    @Param("imgpath") image: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.uploadsService.getFile(res, image);
  }
}
