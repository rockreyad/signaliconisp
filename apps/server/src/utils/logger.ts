import chalk from 'chalk';

export const logger = {
  info: (message: string) => console.log(chalk.blue(`ℹ ${message}`)),
  success: (message: string) => console.log(chalk.green(`✓ ${message}`)),
  warning: (message: string) => console.log(chalk.yellow(`⚠ ${message}`)),
  error: (message: string) => console.log(chalk.red(`✖ ${message}`)),
  route: (method: string, path: string) => {
    const colorizeMethod = (method: string) => {
      switch (method.toUpperCase()) {
        case 'GET':
          return chalk.green(method);
        case 'POST':
          return chalk.yellow(method);
        case 'PUT':
          return chalk.blue(method);
        case 'DELETE':
          return chalk.red(method);
        default:
          return chalk.gray(method);
      }
    };

    console.log(
      `${chalk.cyan('➜')} ${colorizeMethod(method.toUpperCase())} ${chalk.gray(
        path,
      )}`,
    );
  },
};
