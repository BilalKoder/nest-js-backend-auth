import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty({ example: 'john_doe', description: 'First Name | Last Name' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Unique email address' })
  email: string;

  @ApiProperty({ example: 'StrongP@ssw0rd', description: 'User password' })
  password: string;
}
