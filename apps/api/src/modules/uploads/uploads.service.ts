import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Upload } from "./upload.entity";
import { type Response } from "express";
import { createReadStream } from "fs";
import { access } from "fs/promises";
import { join } from "path";
import { type UploadFileDTO } from "@/types/models/Upload";

@Injectable()
export class UploadsService {
  constructor(
    @InjectModel(Upload.name)
    private readonly UploadModel: Model<Upload>,
  ) {}

  async checkFileExists(id: string): Promise<Upload> {
    const element = await this.UploadModel.findById(id).exec();
    if (element === null)
      throw new NotFoundException(`Archivo con el id #${id} no existe`);
    return element;
  }

  async getFile(res: Response, id: string): Promise<any> {
    // const element = await this.checkFileExists(id);
    await access(join(process.cwd(), `uploads/${id}`));
    const file = createReadStream(join(process.cwd(), `uploads/${id}`));
    res.setHeader("Content-Disposition", "inline");
    file.pipe(res);
  }

  async upload(
    body: UploadFileDTO,
    payload: Express.Multer.File,
  ): Promise<any> {
    return payload;
    /* const fileToCreate = {
      originalName: payload.originalname,
      mimeType: payload.mimetype,
      path: payload.path,
      fileName: payload.filename,
      type: body.type ?? "Unassigned",
      purpose: body.purpose ?? "Unassigned",
      size: payload.size,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const file = await this.UploadModel.create(fileToCreate);

    return await file.save(); */
  }
}
