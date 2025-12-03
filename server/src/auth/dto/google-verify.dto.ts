import { ApiProperty } from '@nestjs/swagger';

export class GoogleVerifyDto {
  @ApiProperty({
    example: 'f3c9b1b8-1f41-4d6c-8b39-2adfb5e7e6d7',
  })
  code: string;
}
