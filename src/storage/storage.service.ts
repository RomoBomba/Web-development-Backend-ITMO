import { Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
    private s3Client: S3Client;
    private readonly bucketName: string;
    private readonly logger = new Logger(StorageService.name);

    constructor() {
        const accessKeyId = process.env.YANDEX_ACCESS_KEY_ID;
        const secretAccessKey = process.env.YANDEX_SECRET_ACCESS_KEY;
        const bucketName = process.env.YANDEX_BUCKET_NAME;

        if (!accessKeyId || !secretAccessKey) {
            throw new Error('YANDEX_ACCESS_KEY_ID and YANDEX_SECRET_ACCESS_KEY must be set in environment');
        }

        if (!bucketName) {
            throw new Error('YANDEX_BUCKET_NAME must be set in environment');
        }

        this.bucketName = bucketName;

        this.s3Client = new S3Client({
            region: 'ru-central1',
            endpoint: 'https://storage.yandexcloud.net',
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
            },
        });
    }

    async uploadFile(file: Express.Multer.File, folder: string = 'products'): Promise<string> {
        const key = `${folder}/${uuidv4()}-${file.originalname}`;

        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        try {
            await this.s3Client.send(command);
            this.logger.log(`✅ File uploaded: ${key}`);
            return key;
        } catch (error) {
            this.logger.error(`❌ Upload failed: ${error.message}`);
            throw error;
        }
    }

    async getFileUrl(key: string, expiresIn: number = 3600): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });

        return getSignedUrl(this.s3Client, command, { expiresIn });
    }
}