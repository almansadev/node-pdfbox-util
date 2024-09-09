"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodePdfBoxUtilsBasic = void 0;
const child_process_1 = __importDefault(require("child_process"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./pdfboxutil/utils");
//Creamos la clase NodePdfBoxUtilsBasic. Dentro tendrá las funciones
// getDocumentInfo
// getDocumentText
// convertPdfToImage
const libpath = path_1.default.join(__dirname, "../lib");
const defaultBuffer = 1; //tamaño en MB
// const java_classpath = `${libpath}/pdfbox-3.0.3.jar;${libpath}/fontbox-3.0.3.jar;${libpath}/commons-logging-1.3.3.jar;${libpath}/gson-2.11.0.jar;${libpath}/pdfbox-io-3.0.3.jar;${libpath}/apache-pdfbox-utils-1.0.0.jar;${libpath}/error_prone_annotations-2.27.0.jar`
const java_classpath2 = `${libpath}/node-pdfbox-util.jar`;
class NodePdfBoxUtilsBasic {
    static getDocumentText(filePath_1, outputFile_1) {
        return __awaiter(this, arguments, void 0, function* (filePath, outputFile, options = {}) {
            let bufferSize = NodePdfBoxUtilsBasic.getOptionValue(options, "buffer", defaultBuffer);
            // const encodedOptions = stingtobase64(JSON.stringify(options));
            //si outputFile no está definido, lo definimos como "<|empty|>"
            let outputFileForClass = outputFile === "" ? "-empty-" : outputFile;
            const encodedOptions = (0, utils_1.stingtobase64)(JSON.stringify(options));
            const command = `java -classpath ${java_classpath2} com.node.laucher.PdfToText`;
            const params = `${(0, utils_1.stingtobase64)(filePath)} ${(0, utils_1.stingtobase64)(outputFileForClass)} ${encodedOptions}`;
            const result = child_process_1.default.execSync(`${command} ${params}`, { maxBuffer: 1024 * 1024 * bufferSize });
            const obj = NodePdfBoxUtilsBasic.extractJSONFromResult(result.toString());
            //devolvemos el objeto
            return obj;
        });
    }
    static getDocumentInfo(filePath_1) {
        return __awaiter(this, arguments, void 0, function* (filePath, options = {}) {
            let bufferSize = NodePdfBoxUtilsBasic.getOptionValue(options, "buffer", defaultBuffer);
            // const encodedOptions = stingtobase64(JSON.stringify(options));
            //si outputFile no está definido, lo definimos como "<|empty|>"
            const command = `java -classpath ${java_classpath2} com.node.laucher.PdfInfo`;
            const params = `${(0, utils_1.stingtobase64)(filePath)}`;
            const result = child_process_1.default.execSync(`${command} ${params}`, { maxBuffer: 1024 * 1024 * bufferSize });
            const obj = NodePdfBoxUtilsBasic.extractJSONFromResult(result.toString());
            //devolvemos el objeto
            return obj;
        });
    }
    static convertPdfToImage(filePath_1, fromPage_1, toPage_1, outputPath_1) {
        return __awaiter(this, arguments, void 0, function* (filePath, fromPage, toPage, outputPath, options = {}) {
            const command = `java -classpath ${java_classpath2} com.node.laucher.PdfToImage`;
            let bufferSize = NodePdfBoxUtilsBasic.getOptionValue(options, "buffer", defaultBuffer);
            const encodedOptions = (0, utils_1.stingtobase64)(JSON.stringify(options));
            const params = `${(0, utils_1.stingtobase64)(filePath)} ${fromPage} ${toPage} ${(0, utils_1.stingtobase64)(outputPath)} ${encodedOptions}`;
            const result = child_process_1.default.execSync(`${command} ${params}`, { maxBuffer: 1024 * 1024 * bufferSize });
            const obj = NodePdfBoxUtilsBasic.extractJSONFromResult(result.toString());
            //devolvemos el objeto
            return obj;
        });
    }
    static extractJSONFromResult(result) {
        //cogemos result.toString() y nos quedamos desde ```JSON: hasta el final del string menos 3 caracteres
        const json = result.substring(result.indexOf("JSON:") + 5, result.length - 3);
        //decodificamos el json porque se recibe en base64
        const decodedJsonString = (0, utils_1.base64tostring)(json);
        //convertimos el json a objeto
        const obj = JSON.parse(decodedJsonString);
        //devolvemos el objeto
        return obj;
    }
    static getOptionValue(options, key, defaultValue) {
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
exports.NodePdfBoxUtilsBasic = NodePdfBoxUtilsBasic;
