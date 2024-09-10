import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/roles';
import { Role } from '../config/types/role';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.ADMIN, Role.DEALER)
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto, @Req() request) {
    const { user } = request;
    return this.userService.create(createUserDto, +user.sub, user.role);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() request) {
    const { password, ...user } = await this.userService.findOne(+request.user.sub);
    return user;
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.DEALER)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string, @Req() request) {
    const { user } = request;
    return this.userService.remove(+id, +user.sub, user.role);
  }

  @Get()
  @Roles(Role.ADMIN, Role.DEALER)
  @UseGuards(AuthGuard, RolesGuard)
  async findAll(@Req() request) {
    const { user } = request;
    const users = await this.userService.findAll(+user.sub, user.role);
    return users.map(({ password, ...restUserProps }) => restUserProps);
  }
}
