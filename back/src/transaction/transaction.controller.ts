import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Roles } from '../auth/roles';
import { Role } from '../config/types/role';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/role.guard';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard, RolesGuard)
  create(
      @Body() createTransactionDto: CreateTransactionDto,
      @Req() request
  ) {
    const { user } = request;
    return this.transactionService.create(createTransactionDto, user.sub);
  }

  @Get()
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard, RolesGuard)
  findAll(
      @Req() request
  ) {
    const { user } = request;
    return this.transactionService.findAll(+user.sub);
  }

  @Delete(':id')
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard, RolesGuard)
  remove(
      @Param('id') id: string
  ) {
    return this.transactionService.remove(+id);
  }
}
