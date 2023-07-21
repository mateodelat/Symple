import { 
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsArray
} from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";
import { type Types } from "mongoose";


export enum Roles {
  Admin = "admin",
  User = "user",
}

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Nombre del usuario; Campo obligatorio." })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Apellido(s) del usuario; Campo obligatorio." })
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: "Correo electrónico del usuario; Campo obligatorio." })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Contraseña del usuario; Campo obligatorio." })
  readonly password: string;
  
  @IsNotEmpty()
  @IsEnum(Roles)
  @ApiProperty({ description: "Estado del usuario: Es administrador general o usuario; Campo obligatorio." })
  readonly role: Roles;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @ApiProperty({ description: "Estado del usuario: Es administrador general o usuario; Campo obligatorio." })
  readonly enterprises: Types.ObjectId[] 
}
