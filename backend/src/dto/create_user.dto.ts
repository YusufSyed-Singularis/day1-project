import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'The email of the user', example: 'user@example.com' })
    email: string;
    @ApiPropertyOptional({ description: 'The name of the user', example: 'John Doe' })
    name?: string;
}