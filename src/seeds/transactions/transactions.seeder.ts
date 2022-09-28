import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { parse as csvParse } from 'csv-parse/sync';

import { ISeeder } from '../seeder';
import { Transaction } from '../../transactions/transactions.entity';

/*
  Reverse date string day, month, year
  Example: 08-01-2022 => 2022-01-08
*/
const convertDateFormat = (date: string) => date.split('-').reverse().join('-');

@Injectable()
export class TransactionsSeeder implements ISeeder {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  public async isSeeded(): Promise<boolean> {
    return this.transactionsRepository.count().then((count) => count > 0);
  }

  public async run(): Promise<void> {
    const data = csvParse(fs.readFileSync(__dirname + '/transactions.csv'), {
      fromLine: 2,
    });
    const rows = data.map((row) => ({
      date: new Date(convertDateFormat(row[0])),
      sum: row[1],
      source: row[2],
      description: row[3],
    }));
    await this.transactionsRepository.insert(rows as Transaction[]);
  }
}
