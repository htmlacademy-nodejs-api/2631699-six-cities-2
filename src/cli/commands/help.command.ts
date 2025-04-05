import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
      Программа для подготовки данных для REST API сервера.
      Пример: ${chalk.greenBright('cli.js --<command> [--arguments]')}

      Команды:

      ${chalk.greenBright('--version')}:                   # выводит номер версии
      ${chalk.greenBright('--help')}:                      # печатает этот текст
      ${chalk.greenBright('--import <path>')}:             # импортирует данные из TSV
    `);
  }
}
