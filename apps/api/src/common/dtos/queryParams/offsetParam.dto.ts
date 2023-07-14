import { ApiProperty } from '@nestjs/swagger'

export class offsetParamDTO {
  @ApiProperty({ default: 0, required: false })
    offset: Number
}
