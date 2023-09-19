import {Injectable} from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
    constructor() {
    }

    async print(path: string): Promise<Buffer> {
        const browser = await puppeteer.launch({ headless: 'new', defaultViewport: null });
        const page = await browser.newPage();
        
        await page.goto(path, { waitUntil: 'networkidle0' });
        await page.emulateMediaType('screen');
        
        const pdf = await page.pdf({
            path: 'result.pdf',
            
            // margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
            printBackground: true,
            format: 'A4',
        });

        await browser.close();
        
        return pdf;
    }
}
