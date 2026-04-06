export declare class StorageService {
    private s3Client;
    private readonly bucketName;
    private readonly logger;
    constructor();
    uploadFile(file: Express.Multer.File, folder?: string): Promise<string>;
    getFileUrl(key: string, expiresIn?: number): Promise<string>;
}
