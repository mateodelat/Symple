import { IsString, IsNotEmpty, IsEmail } from 'class-validator'
import { PartialType, ApiProperty } from '@nestjs/swagger'

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre del usuario; Campo obligatorio.' })
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Apellido(s) del usuario; Campo obligatorio.' })
  readonly lastName: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Correo electrónico del usuario; Campo obligatorio.' })
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Contraseña del usuario; Campo obligatorio.' })
  readonly password: string
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) { }
