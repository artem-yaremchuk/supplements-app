import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { VALIDATION_MESSAGES } from '../../constants/validation-messages';

export class RegisterRequestDto {
  @ApiProperty({ required: true, example: 'John Doe' })
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: VALIDATION_MESSAGES.NAME.MIN_LENGTH })
  @MaxLength(50, { message: VALIDATION_MESSAGES.NAME.MAX_LENGTH })
  name: string;

  @ApiProperty({ required: true, example: 'john.doe@company.com' })
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  @IsNotEmpty()
  @IsEmail({}, { message: VALIDATION_MESSAGES.EMAIL.INVALID })
  @MaxLength(50, { message: VALIDATION_MESSAGES.EMAIL.MAX_LENGTH })
  email: string;

  @ApiProperty({ required: true, example: 'SecurePass123!' })
  @IsString()
  @MinLength(8, { message: VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH })
  @MaxLength(30, { message: VALIDATION_MESSAGES.PASSWORD.MAX_LENGTH })
  password: string;
}
