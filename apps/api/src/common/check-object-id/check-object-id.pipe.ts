import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common'
import { isValidObjectId } from 'mongoose'

@Injectable()
export class CheckObjectIdPipe implements PipeTransform {
  transform (value: any, metadata: ArgumentMetadata): string {
    if (!isValidObjectId(value)) throw new BadRequestException('Invalid or malformed ObjectId.')
    return value
  }
}
