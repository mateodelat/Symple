import { ApiProperty } from "@nestjs/swagger";

export class limitParamDTO {
  @ApiProperty({ default: 10, required: false })
  limit: number;
}
