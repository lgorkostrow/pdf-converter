import {
  Controller,
  Header,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PdfService } from './pdf.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('print')
  @Header('Content-Type', 'application/pdf')
  @UseInterceptors(FileInterceptor('file'))
  async print(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<StreamableFile> {
    return new StreamableFile(await this.pdfService.print(file.buffer));
  }
}
