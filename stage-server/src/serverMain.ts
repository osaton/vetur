import { createConnection, InitializeParams, InitializeResult } from 'vscode-languageserver/node';
import { LS } from './services/ls';

const connection = process.argv.length <= 2 ? createConnection(process.stdin, process.stdout) : createConnection();

console.log = connection.console.log.bind(connection.console);
console.error = connection.console.error.bind(connection.console);

const vls = new LS(connection);
connection.onInitialize(
  async (params: InitializeParams): Promise<InitializeResult> => {
    await vls.init(params);

    console.log('Stage server initialized');

    return {
      capabilities: vls.capabilities
    };
  }
);

vls.listen();
