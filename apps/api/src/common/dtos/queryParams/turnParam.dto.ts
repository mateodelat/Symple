import { ApiProperty } from "@nestjs/swagger";

export class turnParamDTO {
  @ApiProperty({ default: 10, required: false })
  limit: number;
}
