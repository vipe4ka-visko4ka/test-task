import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from './transactions.entity';

class ReportDto {
  public readonly source: string;
  public readonly data: { sum: string; date: string }[];

  constructor(source: string, data: { sum: string; date: Date }[]) {
    this.source = source;
    this.data = data.map(({ sum, date }) => ({
      sum,
      date: `${date.getMonth() + 1}-${date.getFullYear()}`,
    }));
  }
}

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  public async getTransactionsReport() {
    const data = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .select('transaction.source', 'source')
      .addSelect('transaction.date', 'date')
      .addSelect('SUM(transaction.sum)', 'sum')
      .groupBy('transaction.source')
      .addGroupBy('transaction.date')
      .orderBy('transaction.date')
      .getRawMany();

    const report: { [key: string]: { sum: string; date: Date }[] } = {};

    data.forEach((row) => {
      if (!report[row.source]) report[row.source] = [];
      report[row.source].push({ date: row.date, sum: row.sum });
    });

    const formattedReport = Object.entries(report).map(
      ([source, data]) => new ReportDto(source, data),
    );

    return formattedReport;
  }
}
