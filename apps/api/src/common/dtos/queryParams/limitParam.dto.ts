import { ApiProperty } from "@nestjs/swagger";

export class limitParamDTO {
  @ApiProperty({ default: 30, required: false })
  limit: number;
}
