// src/index.d.ts

export declare class NodePdfBoxUtilsBasic {    
    public static getDocumentText(filePath: string, outputFile: string, options: { [key: string]: any }): Promise<any>;
    public static convertPdfToImage(filePath: string, fromPage: number, toPage: number, outputPath: string, options: { [key: string]: any }): Promise<any>;
    public static getDocumentInfo(filePath: string, options: { [key: string]: any }): Promise<any>;
}