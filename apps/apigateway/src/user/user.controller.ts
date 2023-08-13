import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { Roles, RolesGuard } from '../auth/guard/role.guard';
import { ROLE } from '../../../user/src/user.model';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@UseInterceptors(GrpcToHttpInterceptor)
@UseGuards(JwtGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(ROLE.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(ROLE.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Roles(ROLE.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Roles(ROLE.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
