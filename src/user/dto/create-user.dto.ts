import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNumber({}, {message: 'the document number must be a number'})
  doc_number: number

  
  @IsString({message: 'the name must be a string'})
  name: string

  
  @IsEmail({},{message: 'the email must be a string'})
  email: string

  
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @IsString({message: 'the password must be a string'})
  password: string
  
  @IsNumber()
  @Min(1)
  @Max(3)
  role_id: number;
}
