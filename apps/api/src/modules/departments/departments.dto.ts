import { IsString, IsNotEmpty } from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";
import { type Types } from "mongoose";

export enum AmountOfEmployees {
  "OneToTen" = "1-10",
  "elevenToTwentyFive" = "11-25",
  "TwentySixToFifty" = "26-50",
  "FiftyPlus" = "50+",
}

export class CreateDepartmentDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Nombre del departamento; Campo obligatorio." })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:
      "ObjectId de la empresa a la que el departamento pertenece; Campo obligatorio.",
  })
  readonly enterprise: Types.ObjectId;
}

export class UpdateDepartmentDTO extends PartialType(CreateDepartmentDTO) {}
