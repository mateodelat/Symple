import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";
import { type Types } from "mongoose";
import { type SubDepartment } from "@/types/models/Department";

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

  @IsArray()
  @ApiProperty({
    description: "Arreglo con subdepartamentos; Campo opcional.",
  })
  readonly subDepartments: SubDepartment[];
}

export class UpdateDepartmentDTO extends PartialType(CreateDepartmentDTO) {}
