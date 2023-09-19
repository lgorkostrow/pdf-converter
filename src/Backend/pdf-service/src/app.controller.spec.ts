import { Test, TestingModule } from '@nestjs/testing';
import { PdfController } from './pdfController';
import { PdfService } from './pdf.service';

describe('AppController', () => {
  let appController: PdfController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PdfController],
      providers: [PdfService],
    }).compile();

    appController = app.get<PdfController>(PdfController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
