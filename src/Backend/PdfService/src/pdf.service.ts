import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { FileUtils } from './file.utils';

@Injectable()
export class PdfService {
  constructor() {}

  async print(file: Buffer): Promise<Buffer> {
    const tmpFilePath = path.join(__dirname, `${uuidv4()}.html`);

    await FileUtils.writeFile(tmpFilePath, file);

    try {
      const browser = await puppeteer.launch({
        headless: 'new',
        defaultViewport: null,
      });
      const page = await browser.newPage();

      await page.goto(`file://${tmpFilePath}`, { waitUntil: 'networkidle0' });
      await page.emulateMediaType('screen');

      const pdf = await page.pdf({
        printBackground: true,
        format: 'A4',
      });

      await browser.close();

      return pdf;
    } finally {
      await FileUtils.unlink(tmpFilePath);
    }
  }
}
