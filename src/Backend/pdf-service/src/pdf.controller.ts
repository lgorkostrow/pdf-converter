import {Controller, Get, Post, Req, StreamableFile, UploadedFile, UseInterceptors} from '@nestjs/common';
import { PdfService } from './pdf.service';
import * as fs from "fs";
import { promisify } from 'util';
import {FileInterceptor} from "@nestjs/platform-express";
import * as path from "path";

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('print')
  @UseInterceptors(FileInterceptor('file'))
  async print(@UploadedFile() file: Express.Multer.File): Promise<string> {
    const writeFile = promisify(fs.writeFile);
    const tmpFilePath = path.join(__dirname, "test.html");
    await writeFile(tmpFilePath, file.buffer, 'utf-8');
    
    await this.pdfService.print(`file://${tmpFilePath}`);
    
    return 'ok';
  }
}
