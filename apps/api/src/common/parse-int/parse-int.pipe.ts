import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform (value: string, metadata: ArgumentMetadata): void {
    const number = Number(value)
    if (isNaN(number)) throw new BadRequestException(`Validation failed. "${value}" is not a number.`)
  }
}
