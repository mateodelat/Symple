import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsEnum,
} from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export enum AmountOfEmployees {
  "OneToTen" = "1-10",
  "elevenToTwentyFive" = "11-25",
  "TwentySixToFifty" = "26-50",
  "FiftyPlus" = "50+",
}

export class CreateEnterpriseDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Giro de la empresa; Campo obligatorio." })
  readonly name: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: "Imagen de la empresa; No es un campo obligatorio.",
  })
  readonly image?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Giro de la empresa; Campo obligatorio." })
  readonly turn: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Dirección de la empresa; Campo obligatorio." })
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Teléfono de la empresa; Campo obligatorio." })
  readonly telephone: string;

  @IsNotEmpty()
  @IsEnum(AmountOfEmployees)
  @ApiProperty({
    description: "Cantidad de empleados de la empresa; Campo obligatorio.",
  })
  readonly amountOfEmployees: AmountOfEmployees;

  @IsNotEmpty()
  @IsString({ each: true })
  @ApiProperty({
    description:
      "Arreglo con los ObjectIds de los administradores de la empresa; Campo obligatorio.",
  })
  readonly admins: string[];
}

export class UpdateEnterpriseDTO extends PartialType(CreateEnterpriseDTO) {}
