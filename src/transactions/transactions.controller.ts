import { Controller, Get } from '@nestjs/common';

import { TransactionService } from './transactions.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/report')
  public getReport() {
    return this.transactionService.getTransactionsReport();
  }
}
