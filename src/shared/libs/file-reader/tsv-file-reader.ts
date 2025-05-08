import EventEmitter from 'node:events';
import { createReadStream, ReadStream } from 'node:fs';
import { FileReader } from './file-reader.interface.js';

const CHUNK_SIZE = 102400; // 100KB

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(private readonly filename: string) {
    super();
  }

  public async * getLines(stream: ReadStream): AsyncGenerator<string> {
    let remainingData = '';

    for await (const chunk of stream) {
      let nextLinePosition = -1;
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const line = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(nextLinePosition + 1);
        yield line;
      }
    }
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    const lineGenerator = this.getLines(readStream);
    let importedRowCount = 0;

    for await (const line of lineGenerator) {
      importedRowCount++;
      await new Promise((resolve) => {
        this.emit('line', line, resolve);
      });
    }

    this.emit('end', importedRowCount);
  }
}
