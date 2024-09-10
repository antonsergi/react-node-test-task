import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
      @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
  ) {}
  create(createTransactionDto: CreateTransactionDto, userId: number) {
    const transactionEntity = this.transactionRepository.create({
      value: createTransactionDto.value,
      user_id: userId
    });

    return this.transactionRepository.save(transactionEntity);
  }

  findAll(userId: number) {
    return this.transactionRepository.find({ where: { user_id: userId } });
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return this.transactionRepository.remove(transaction);
  }
}
