import { promisify } from 'util';
import * as fs from 'fs';

export class FileUtils {
  static async writeFile(filePath: string, file: Buffer): Promise<void> {
    const writeFile = promisify(fs.writeFile);

    return await writeFile(filePath, file, 'utf-8');
  }

  static async unlink(filePath: string): Promise<void> {
    const unlink = promisify(fs.unlink);

    return await unlink(filePath);
  }
}
