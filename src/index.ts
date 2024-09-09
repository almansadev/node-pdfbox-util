import exec from 'child_process';
import path from 'path';
import { base64tostring, stingtobase64 } from './pdfboxutil/utils';
//Creamos la clase NodePdfBoxUtilsBasic. Dentro tendrá las funciones
// getDocumentInfo
// getDocumentText
// convertPdfToImage

const libpath = path.join(__dirname, "../lib");
const defaultBuffer = 1 //tamaño en MB
// const java_classpath = `${libpath}/pdfbox-3.0.3.jar;${libpath}/fontbox-3.0.3.jar;${libpath}/commons-logging-1.3.3.jar;${libpath}/gson-2.11.0.jar;${libpath}/pdfbox-io-3.0.3.jar;${libpath}/apache-pdfbox-utils-1.0.0.jar;${libpath}/error_prone_annotations-2.27.0.jar`
const java_classpath2 = `${libpath}/node-pdfbox-util.jar`
const defaultJavaPath = 'java';
export class NodePdfBoxUtilsBasic {

  public static async getDocumentText(filePath: string, outputFile: string, options: { [key: string]: any } = {}): Promise<any> {
    let bufferSize = NodePdfBoxUtilsBasic.getOptionValue(options, "buffer", defaultBuffer);
    let javaPath  = NodePdfBoxUtilsBasic.getOptionValue(options, "javaPath", defaultJavaPath);
    // const encodedOptions = stingtobase64(JSON.stringify(options));
    //si outputFile no está definido, lo definimos como "<|empty|>"
    let outputFileForClass = outputFile === "" ? "-empty-" : outputFile;
    const encodedOptions = stingtobase64(JSON.stringify(options));
    const command = `${javaPath} -classpath ${java_classpath2} com.node.laucher.PdfToText`;
    const params = `${stingtobase64(filePath)} ${stingtobase64(outputFileForClass)} ${encodedOptions}`
    const result = exec.execSync(`${command} ${params}`, { maxBuffer: 1024 * 1024 * bufferSize });
    const obj = NodePdfBoxUtilsBasic.extractJSONFromResult(result.toString());
    //devolvemos el objeto
    return obj;
  }

  public static async getDocumentInfo(filePath: string, options: { [key: string]: any } = {}): Promise<any> {
    let bufferSize = NodePdfBoxUtilsBasic.getOptionValue(options, "buffer", defaultBuffer);
    let javaPath  = NodePdfBoxUtilsBasic.getOptionValue(options, "javaPath", defaultJavaPath);
    // const encodedOptions = stingtobase64(JSON.stringify(options));
    //si outputFile no está definido, lo definimos como "<|empty|>"
    const command = `${javaPath} -classpath ${java_classpath2} com.node.laucher.PdfInfo`;
    const params = `${stingtobase64(filePath)}`
    const result = exec.execSync(`${command} ${params}`, { maxBuffer: 1024 * 1024 * bufferSize });
    const obj = NodePdfBoxUtilsBasic.extractJSONFromResult(result.toString());
    //devolvemos el objeto
    return obj;
  }


  public static async convertPdfToImage(filePath: string, fromPage: number, toPage: number, outputPath: string, options: { [key: string]: any } = {}): Promise<any> {
    let bufferSize = NodePdfBoxUtilsBasic.getOptionValue(options, "buffer", defaultBuffer);
    let javaPath  = NodePdfBoxUtilsBasic.getOptionValue(options, "javaPath", defaultJavaPath);
    const command = `${javaPath} -classpath ${java_classpath2} com.node.laucher.PdfToImage`;
    
    const encodedOptions = stingtobase64(JSON.stringify(options));
    const params = `${stingtobase64(filePath)} ${fromPage} ${toPage} ${stingtobase64(outputPath)} ${encodedOptions}`
    const result = exec.execSync(`${command} ${params}`, { maxBuffer: 1024 * 1024 * bufferSize });
    const obj = NodePdfBoxUtilsBasic.extractJSONFromResult(result.toString());
    //devolvemos el objeto
    return obj;
  }

  private static extractJSONFromResult(result: string): Promise<any> {
    //cogemos result.toString() y nos quedamos desde ```JSON: hasta el final del string menos 3 caracteres
    const json = result.substring(result.indexOf("JSON:") + 5, result.length - 3);
    //decodificamos el json porque se recibe en base64
    const decodedJsonString = base64tostring(json);
    //convertimos el json a objeto
    const obj = JSON.parse(decodedJsonString);
    //devolvemos el objeto
    return obj;
  }

  private static getOptionValue(options: { [key: string]: any }, key: string, defaultValue: any): any {
    if (options) {

      if (typeof options !== 'object') {
        throw new Error("options must be a json object");
      }
      if (options[key]) {
        return options[key];
      }
    }
    return defaultValue;
  }

}
