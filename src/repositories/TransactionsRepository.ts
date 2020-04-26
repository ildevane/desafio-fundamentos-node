import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((accumulator, currentValue) => {
      return currentValue.type === 'income'
        ? accumulator + currentValue.value
        : accumulator;
    }, 0);

    const outcome = this.transactions.reduce((accumulator, currentValue) => {
      return currentValue.type === 'outcome'
        ? accumulator + currentValue.value
        : accumulator;
    }, 0);

    const total = income - outcome;
    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transactions = new Transaction({ title, value, type });
    this.transactions.push(transactions);
    return transactions;
  }
}

export default TransactionsRepository;
