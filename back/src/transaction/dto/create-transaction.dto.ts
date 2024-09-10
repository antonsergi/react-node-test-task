import { IsInt } from 'class-validator';

export class CreateTransactionDto {
    @IsInt()
    value: number;
}
