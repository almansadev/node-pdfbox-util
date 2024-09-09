# node-pdfbox-util

**node-pdfbox-util** is a library that allows integration and execution of basic functions of Apache PDFBox (https://pdfbox.apache.org/). Apache PDFBox is a Java library for working with PDF documents. It includes an embedded jar with dependencies on:

- commons-logging-1.3.3.jar
- error_prone_annotations-2.27.0.jar
- fontbox-3.0.3.jar
- gson-2.11.0.jar
- pdfbox-3.0.3.jar
- pdfbox-io-3.0.3.jar

The **node-pdfbox-util** library is developed to facilitate certain actions on PDF documents from a Node.js environment.

## Functionalities

- **getDocumentText**: Extract text from a PDF.
- **convertPdfToImage**: Convert a PDF page to an image.
- **getDocumentInfo**: Obtain basic document information.

## Usage Examples

### getDocumentText
```javascript
import { NodePdfBoxUtilsBasic } from 'node-pdfbox-util';

const pdfFilePath = "path/to/pdf.pdf";
const outputFile = ""; // Optional. If specified, the content is stored at the specified path.
const options = {
  buffer: 1, // Optional, default is 1. Specify buffer size, recommended to increase for very large documents.
  pageIndicator: true, // Optional, default is false. If specified, page number will be included in the text.
  responseInPages: true // Optional, default is false. If specified, an array with the text of each page will be returned.
};

NodePdfBoxUtilsBasic.getDocumentText(pdfFilePath, outputFile, options).then((result) => {
  console.log(result);
});
```

### getDocumentInfo
```javascript
import { NodePdfBoxUtilsBasic } from 'node-pdfbox-util';

const pdfFilePath = "path/to/pdf.pdf";
const options = {
  buffer: 1 // Optional, default is 1. Specify buffer size, recommended to increase for very large documents.
};

NodePdfBoxUtilsBasic.getDocumentInfo(pdfFilePath, options).then((result) => {
  console.log(result);
});
```

### convertPdfToImage
```javascript
import { NodePdfBoxUtilsBasic } from 'node-pdfbox-util';

const pdfFilePath = "path/to/pdf.pdf";
const fromPage = 1;
const toPage = 1;
const outputFileName = "path/to/output."; // Generated images will have .png extension and a page number at the end of the file name.
const options = {
  dpi: 300, // Optional, default is 200. Specify image resolution.
  toBase64: false // Optional, default is false. If specified, images will be returned as a base64 array.
};

NodePdfBoxUtilsBasic.convertPdfToImage(pdfFilePath, fromPage, toPage, outputFileName, options).then((result) => {
  console.log(result);
});
```

## LICENSE
Copyright (C) 2024 Alberto Almansa

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.