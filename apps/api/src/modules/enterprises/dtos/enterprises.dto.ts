import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator'
import { PartialType, ApiProperty } from '@nestjs/swagger'

export class CreateEnterpriseDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Giro de la empresa; Campo obligatorio.' })
  readonly name: string

  @IsString()
  @IsOptional()
  @IsUrl()
  @ApiProperty({ description: 'Imagen de la empresa; No es un campo obligatorio.' })
  readonly image?: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Giro de la empresa; Campo obligatorio.' })
  readonly turn: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Dirección de la empresa; Campo obligatorio.' })
  readonly address: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Teléfono de la empresa; Campo obligatorio.' })
  readonly telephone: string
}

export class UpdateEnterpriseDTO extends PartialType(CreateEnterpriseDTO) {}
