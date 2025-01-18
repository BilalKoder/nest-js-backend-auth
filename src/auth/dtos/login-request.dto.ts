import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({ example: 'john@gamil.com', description: 'User Email' })
  email: string;

  @ApiProperty({ example: 'StrongP@ssw0rd', description: 'User password' })
  password: string;
}
