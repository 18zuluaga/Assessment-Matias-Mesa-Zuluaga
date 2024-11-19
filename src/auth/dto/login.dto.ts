import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description:
      'The emial of the user. This should be a valid email address.',
    example: "admin@correo.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user. Should be a string.',
    example: 123456,
  })
  @IsString()
  password: string;
}
