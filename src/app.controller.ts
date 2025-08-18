import { Controller, Body, Param, Get, Post, Put, Delete, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create_user.dto'
import { UpdateUserDto } from './dto/update_user.dto';
import { User } from '@prisma/client'

@ApiTags('users')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users.' })
  @Get('users')
  @HttpCode(200)
  async getUsers(): Promise<User[]> {
    return this.userService.users();
  }

  @ApiOperation({ summary: 'Get a specified user' })
  @ApiResponse({ status: 200, description: 'Returns the specified user.' })
  @Get('user/:id')
  @HttpCode(200)
  async getUser(@Param('id') id: string): Promise<User> {
    const user = await this.userService.user({ id: parseInt(id)})
    if (!user){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return user;
  }

  @ApiOperation({ summary: 'Create a user from input' })
  @ApiResponse({ status: 201, description: 'Returns the created user.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('user')
  @HttpCode(201)
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(data);
    if (!user) {
      throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @ApiOperation({ summary: 'Update a specified user data from input' })
  @ApiResponse({ status: 200, description: 'Returns the updated user.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Put('user/:id')
  @HttpCode(200)
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
    const user = await this.userService.updateUser({id: parseInt(id)}, data);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @ApiOperation({ summary: 'Delete a specified user' })
  @ApiResponse({ status: 200, description: 'Returns the deleted user.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete('user/:id')
  @HttpCode(200)
  async deleteUser(@Param('id') id: string): Promise<User> {
    const user = await this.userService.deleteUser({id: parseInt(id)});
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
