import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { type Types } from "mongoose";
import {
  type IFunction,
  type Deliverable,
  type Indicator,
} from "@/types/models/Role";

export class CreateRoleDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Nombre del rol; Campo obligatorio." })
  readonly name: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: "Indicadores del rol; Campo obligatorio." })
  readonly indicators: Indicator[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: "Entregables del rol; Campo obligatorio." })
  readonly deliverables: Deliverable[];

  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({ description: "Funciones del rol; Campo obligatorio." })
  readonly functions: IFunction[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "ObjectId del departamento; Campo obligatorio",
  })
  readonly department: Types.ObjectId;
}

export class UpdateRoleDTO extends PartialType(CreateRoleDTO) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "ObjectId del departamento; Campo obligatorio",
  })
  readonly department: Types.ObjectId;
}
