
import { NodePdfBoxUtilsBasic } from '../src/index';

const PDFPATH = "/mnt/c/_personal/_borrar/Lorem ipsum dolor sit amet.pdf";

test('extract_text_fail_path', async () => {
  const filePath = ""
  const result = await NodePdfBoxUtilsBasic.getDocumentText('filePath', 'outputFile', { buffer: 1 });
  console.log("[ ~ test ~ result]:", result)
  expect(result.success).toBe(false);
});
test('extract_text_ok', async () => {
  const filePath = ""
  const result = await NodePdfBoxUtilsBasic.getDocumentText(PDFPATH, '', { buffer: 1 });
  console.log("[ ~ test ~ result]:", result)
  expect(result.success).toBe(true);
});
test('pdf_info', async () => {
  const filePath = ""
  const result = await NodePdfBoxUtilsBasic.getDocumentInfo(PDFPATH, { buffer: 1 });
  console.log("[pdf_info]:", result)
  expect(result.success).toBe(true);
});
test('pdf_split', async () => {
  const outputPath = "/home/aalmansa/temp/_varios/pdfsplit/pdf_split"
  //"{\"startPage\":1, \"numberOfPages\":5, \"recursive\":true}"
  const options = { startPage: 1, numberOfPages: 20, recursive: true, buffer: 1 }
  const result = await NodePdfBoxUtilsBasic.splitDocument(PDFPATH,outputPath,options);
  console.log("[pdf_info]:", result)
  expect(result.success).toBe(true);
});